import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { convertToCoreMessages, generateText, streamText } from "ai"
import * as z from "zod"

import { models } from "@/config/models"
import { db } from "@/lib/prisma"
import { estimateTokens } from "@/lib/utils"

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

  console.log(`GET /models/${modelId}/predict`)

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
  console.log({ stream, system, messages })

  /*   const req_token = headersList.get("x-api-key") as string
  const api_token = await db.aPIToken.findFirst({
    where: {
      token: req_token,
      deletedAt: null,
    },
  })

  if (!api_token) {
    return NextResponse.json(
      { error: "ERROR: Invalid API token." },
      { status: 401 }
    )
  } */

  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey:
      "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" /* api_token.token, */,
  })

  if (stream) {
    const result = await generateText({
      model: groq(model.id),
      system,
      messages: convertToCoreMessages(messages),
    })

    console.log(`Tokens used: ${estimateTokens(messages)}`)

    return NextResponse.json({ result })
  } else {
    const result = await streamText({
      model: groq(model.id),
      system,
      messages: convertToCoreMessages(messages),
    })

    console.log(`Tokens used: ${estimateTokens(messages)}`)

    return result.toDataStreamResponse()
  }
}
