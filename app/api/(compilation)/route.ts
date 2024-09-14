import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createOpenAI } from "@ai-sdk/openai"
import { RequestStatus } from "@prisma/client"
import { convertToCoreMessages, generateText, streamText } from "ai"
import * as z from "zod"

import { models } from "@/config/models"
import { getFunding, returnError } from "@/lib/api"
import { db } from "@/lib/prisma"
import { getModel } from "@/lib/utils"

import { updateFunding } from "@/actions/funding"
import { createRequest, updateRequest } from "@/actions/request"
import { createUsage } from "@/actions/usage"

export const maxDuration = 60

const ConvertibleMessage = z.object({
  role: z.enum(["system", "user", "assistant", "function", "data", "tool"]),
  content: z.string(),
  toolInvocations: z
    .array(
      z.union([
        z.object({
          state: z.literal("partial-call"),
        }),
        z.object({
          state: z.literal("call"),
        }),
        z.object({
          state: z.literal("result"),
        }),
      ])
    )
    .optional(),
  experimental_attachments: z
    .array(
      z.object({
        name: z.string().optional(),
        contentType: z.string().optional(),
        url: z.string(),
      })
    )
    .optional(),
})

const bodySchema = z
  .object({
    stream: z.boolean(),
    modelId: z
      .string()
      .refine((value) => models.some((model) => model.id === value), {
        message: "ERROR: Invalid 'modelId' parameter.",
      }),
    system: z.string(),
  })
  .and(
    z.union([
      z.object({
        prompt: z.string().optional(),
        messages: z.array(ConvertibleMessage).optional(),
      }),
      z.object({
        prompt: z.never(),
        messages: z.array(ConvertibleMessage),
      }),
    ])
  )

export async function POST(request: NextRequest) {
  const headersList = headers()
  const body = await request.json()

  const req_token = headersList.get("x-api-key") as string
  const { stream, modelId, system, messages, prompt } = body

  try {
    bodySchema.parse(body)
  } catch (error) {
    console.log(error.issues)
    return returnError({
      error: error.issues[0],
      status: 400,
    })
  }

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

  const model = getModel(modelId)
  if (!model) {
    return returnError({
      error: "ERROR: Invalid model or model is offline.",
      status: 400,
      userId: api_token.userId,
      modelId,
    })
  }

  const [usuageRequest, funding] = await Promise.all([
    createRequest({
      response: "PENDING: Request in progress.",
      status: RequestStatus.PENDING,
      request: JSON.stringify(body),
      parameters: {
        model: model.id,
        system,
        messages,
      },
      endpoint: "predict",
      userId: api_token.userId,
      apiTokenId: api_token.id,
    }),
    getFunding(api_token.userId, model.id),
  ])

  if (!funding || funding.amount <= 0) {
    await updateRequest({
      id: usuageRequest.id,
      response: "ERROR: Insufficient balance.",
      status: RequestStatus.FAILED,
    })

    return returnError({
      error: "ERROR: Insufficient balance.",
      status: 400,
      userId: api_token.userId,
      modelId,
    })
  }

  const undrstnd = createOpenAI({
    baseURL: process.env.GROQ_API_ENDPOINT,
    apiKey: api_token.token,
  })

  const undrstnd_data = {
    model: undrstnd(model.id),
    system,
    ...(prompt ? { prompt } : {}),
    ...(messages ? { messages: convertToCoreMessages(messages) } : {}),
  } as any

  let token_used: number
  if (stream === false) {
    const result = await generateText(undrstnd_data)

    token_used = result.usage.totalTokens
    const consumption = token_used * (model.pricing / 1000000)

    try {
      const [funding, usage] = await Promise.all([
        updateFunding(api_token.userId, model.id, consumption),
        createUsage(
          api_token.userId,
          usuageRequest.id,
          token_used,
          consumption
        ),
        updateRequest({
          id: usuageRequest.id,
          response: result.text,
          status: RequestStatus.SUCCESS,
        }),
      ])
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
    } catch (error) {
      await updateRequest({
        id: usuageRequest.id,
        response: "ERROR: Unable to generate text.",
        status: RequestStatus.FAILED,
      })

      return returnError({
        error: "ERROR: Unable to generate text.",
        status: 500,
        modelId,
      })
    }
  } else if (stream === true) {
    const result = await streamText(undrstnd_data)

    token_used = (await result.usage).totalTokens
    const consumption = token_used * (model.pricing / 1000000)

    try {
      await Promise.all([
        updateFunding(api_token.userId, model.id, consumption),
        createUsage(
          api_token.userId,
          usuageRequest.id,
          token_used,
          consumption
        ),
        updateRequest({
          id: usuageRequest.id,
          response: await result.text,
          status: RequestStatus.SUCCESS,
        }),
      ])
    } catch (error) {
      await updateRequest({
        id: usuageRequest.id,
        response: "ERROR: Unable to generate text.",
        status: RequestStatus.FAILED,
      })

      return returnError({
        error: "ERROR: Unable to generate text.",
        status: 500,
        modelId,
      })
    }

    return result.toDataStreamResponse()
  }
}
