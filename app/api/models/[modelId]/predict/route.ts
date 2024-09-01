import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { convertToCoreMessages, generateText, streamText } from "ai"
import * as z from "zod"

import { models } from "@/config/models"
import { db } from "@/lib/prisma"

import { createRequest } from "@/actions/request"

const routeContextSchema = z.object({
  params: z.object({
    modelId: z.string().refine(
      (value) => {
        return models.some((model) => model.id === value)
      },
      {
        message: "ERROR: Invalid 'modelId' parameter.",
      }
    ),
  }),
})

export async function POST(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const {
    params: { modelId },
  } = routeContextSchema.parse(context)

  const model = models.find((model) => model.id === modelId)
  if (!model) {
    return NextResponse.json(
      { error: `ERROR: Model with id ${modelId} not found.` },
      { status: 404 }
    )
  }

  const headersList = headers()
  const body = await request.json()
  const { stream, system, messages } = body

  const req_token = headersList.get("x-api-key") as string
  const api_token = await db.aPIToken.findFirst({
    where: {
      id: req_token,
      deletedAt: null,
    },
  })

  if (!api_token) {
    return NextResponse.json(
      { error: "ERROR: Invalid API token." },
      { status: 401 }
    )
  }

  const funding = await db.funding.findFirst({
    where: {
      userId: api_token.userId,
    },
  })

  if (!funding) {
    return NextResponse.json(
      { error: "ERROR: Funding not found.", date: Date.now() },
      { status: 404 }
    )
  } else if (funding.amount <= 0) {
    await createRequest(
      "ERROR: Insufficient balance.",
      {
        model: model.id,
        system,
        messages,
      },
      "predict",
      api_token.userId
    )

    return NextResponse.json(
      { error: "ERROR: Insufficient balance.", date: Date.now() },
      { status: 400 }
    )
  }

  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: api_token.token,
  })

  const groq_data = {
    model: groq(model.id),
    system,
    messages: convertToCoreMessages(messages),
  }

  try {
    let token_used: number
    if (!stream) {
      const result = await generateText(groq_data)

      token_used = result.usage.totalTokens

      await db.request.create({
        data: {
          response: result.text,
          parameters: {
            model: model.id,
            system,
            messages,
          },
          endpoint: "predict",
          userId: api_token.userId,
        },
      })

      await db.usage.create({
        data: {
          tokensUsed: token_used,
          userId: api_token.userId,
        },
      })

      await db.request.create({
        data: {
          response: await result.text,
          parameters: {
            model: model.id,
            system,
            messages,
          },
          endpoint: "predict",
          userId: api_token.userId,
        },
      })

      await db.usage.create({
        data: {
          tokensUsed: token_used,
          userId: api_token.userId,
        },
      })

      const consumption = token_used * (model.pricing / 1000000)
      const funding = await db.funding.findFirst({
        where: {
          userId: api_token.userId,
        },
      })

      if (!funding) {
        return NextResponse.json(
          { error: "ERROR: Funding not found.", date: Date.now() },
          { status: 404 }
        )
      }

      if (funding.amount < consumption) {
        await createRequest(
          "ERROR: Insufficient balance.",
          {
            model: model.id,
            system,
            messages,
          },
          "predict",
          api_token.userId
        )
        return NextResponse.json(
          { error: "ERROR: Insufficient balance.", date: Date.now() },
          { status: 400 }
        )
      }

      await db.funding.update({
        where: {
          id: funding.id,
          userId: api_token.userId,
        },
        data: {
          amount: funding.amount - consumption,
        },
      })
      await db.usage.create({
        data: {
          tokensUsed: token_used,
          userId: api_token.userId,
        },
      })
      return NextResponse.json({ output: result.text, token_used })
    } else {
      const result = await streamText(groq_data)

      token_used = (await result.usage).totalTokens

      await db.request.create({
        data: {
          response: await result.text,
          parameters: {
            model: model.id,
            system,
            messages,
          },
          endpoint: "predict",
          userId: api_token.userId,
        },
      })

      await db.usage.create({
        data: {
          tokensUsed: token_used,
          userId: api_token.userId,
        },
      })

      const consumption = token_used * (model.pricing / 1000000)
      const funding = await db.funding.findFirst({
        where: {
          userId: api_token.userId,
        },
      })

      if (!funding) {
        return NextResponse.json(
          { error: "ERROR: Funding not found.", date: Date.now() },
          { status: 404 }
        )
      }

      if (funding.amount < consumption) {
        await createRequest(
          "ERROR: Insufficient balance.",
          {
            model: model.id,
            system,
            messages,
          },
          "predict",
          api_token.userId
        )
        return NextResponse.json(
          { error: "ERROR: Insufficient balance.", date: Date.now() },
          { status: 400 }
        )
      }

      await db.funding.update({
        where: {
          id: funding.id,
          userId: api_token.userId,
        },
        data: {
          amount: funding.amount - consumption,
        },
      })
      await db.usage.create({
        data: {
          tokensUsed: token_used,
          userId: api_token.userId,
        },
      })

      return result.toDataStreamResponse()
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "ERROR: Unable to generate text.", date: Date.now() },
      { status: 500 }
    )
  }
}
