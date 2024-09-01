import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { convertToCoreMessages, generateText, streamText } from "ai"
import * as z from "zod"

import { models } from "@/config/models"
import { getFunding, returnError } from "@/lib/api"
import { db } from "@/lib/prisma"
import { getModel } from "@/lib/utils"

import { updateFunding } from "@/actions/funding"
import { createRequest } from "@/actions/request"
import { createUsage } from "@/actions/usage"

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

  const headersList = headers()
  const model = getModel(modelId)
  const body = await request.json()
  const { stream, system, messages, prompt } = body

  const req_token = headersList.get("x-api-key") as string
  const api_token = await db.aPIToken.findFirst({
    where: {
      id: req_token,
      deletedAt: null,
    },
  })

  if (!api_token) {
    return returnError({
      error: "ERROR: Invalid API token.",
      status: 401,
      modelId,
    })
  }

  const funding = await getFunding(api_token.userId, model.id)

  if (!funding || funding.amount <= 0) {
    await createRequest({
      response: "ERROR: Insufficient balance.",
      request: JSON.stringify(body),
      parameters: {
        model: model.id,
        system,
        messages,
      },
      endpoint: "predict",
      userId: api_token.userId,
    })

    return returnError({
      error: "ERROR: Insufficient balance.",
      status: 400,
      userId: api_token.userId,
      modelId,
    })
  }

  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: api_token.token,
  })

  const groq_data = {
    model: groq(model.id),
    system,
    ...(prompt ? { prompt } : {}),
    ...(messages ? { messages: convertToCoreMessages(messages) } : {}),
  }

  try {
    let token_used: number
    if (!stream) {
      const result = await generateText(groq_data)

      token_used = result.usage.totalTokens
      await createRequest({
        response: result.text,
        request: JSON.stringify(groq_data),
        parameters: {
          model: model.id,
          system,
          messages,
        },
        endpoint: "predict",
        userId: api_token.userId,
      })

      const consumption = token_used * (model.pricing / 1000000)
      const funding = await updateFunding(
        api_token.userId,
        model.id,
        consumption
      )

      const usage = await createUsage(api_token.userId, token_used)

      return NextResponse.json({
        output: result.text,
        funding: {
          amount: funding?.amount.toString(),
          currency: funding?.currency,
        },
        usage: {
          tokensUsed: usage.tokensUsed,
          date: usage.createdAt,
        },
      })
    }

    if (stream) {
      const result = await streamText(groq_data)

      token_used = (await result.usage).totalTokens
      await createRequest({
        response: await result.text,
        request: JSON.stringify(groq_data),
        parameters: {
          model: model.id,
          system,
          messages,
        },
        endpoint: "predict",
        userId: api_token.userId,
      })

      const consumption = token_used * (model.pricing / 1000000)
      await updateFunding(api_token.userId, model.id, consumption)
      await createUsage(api_token.userId, token_used)

      return result.toDataStreamResponse()
    }
  } catch (error) {
    console.error(error)
    return returnError({
      error: "ERROR: Unable to generate text.",
      status: 500,
      modelId,
    })
  }
}
