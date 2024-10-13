import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { PineconeStore } from "@langchain/pinecone"
import { Funding, RequestStatus } from "@prisma/client"
import { convertToCoreMessages, generateText, streamText } from "ai"
import * as z from "zod"

import { models } from "@/config/models"
import { siteConfig } from "@/config/site"
import { getErrorResponse } from "@/lib/api"
import { pinecone } from "@/lib/pinecone"
import { db } from "@/lib/prisma"
import { embeddingModel, undrstnd_client } from "@/lib/undrstnd"
import { getModel } from "@/lib/utils"

import { getFunds, updateFunding } from "@/actions/funding"
import { createRequestAPI, updateRequest } from "@/actions/request"
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
    datasourceToken: z.string(),
    similaritySearchLength: z.string(),
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
  const {
    stream,
    modelId,
    messages,
    prompt,
    datasourceToken,
    similaritySearchLength,
  } = body

  try {
    bodySchema.parse(body)
  } catch (error) {
    return getErrorResponse({
      status: 400,
      req_token,
      modelId,
      message: `The parameter '${error.issues[0].path[0]}' could be missing or invalid.`,
    })
  }

  const api_token = await db.aPIToken.findFirst({
    where: {
      id: req_token,
      deletedAt: null,
    },
  })
  if (!api_token) {
    return getErrorResponse({
      status: 401,
      req_token,
      modelId,
    })
  }

  const datasource = await db.resource.findFirst({
    where: {
      id: datasourceToken,
      // userId: api_token.userId, TODO: Remove because it only show datasource for specific users
    },
  })
  if (!datasource) {
    return getErrorResponse({
      status: 400,
      req_token,
      modelId,
      message: `Invalid datasource token, please go to the ${siteConfig.url}/dashboard/data-sources.`,
    })
  }

  const model = getModel(modelId)
  if (!model) {
    return getErrorResponse({
      status: 400,
      req_token,
      modelId,
      message: "Invalid model or model is offline.",
    })
  }

  const [usuageRequest, funding] = await Promise.all([
    createRequestAPI({
      response: "PENDING: Request in progress.",
      status: RequestStatus.PENDING,
      request: JSON.stringify(body),
      parameters: {
        model: model.id,
        system: "RAG System",
        messages,
      },
      endpoint: "rag",
      userId: api_token.userId,
      apiTokenId: api_token.id,
    }),
    getFunds(api_token.userId),
  ])

  if (!funding || funding.amount <= 0) {
    await updateRequest({
      id: usuageRequest.id,
      response: "ERROR: Insufficient balance.",
      status: RequestStatus.FAILED,
    })

    return getErrorResponse({
      status: 402,
      req_token,
      modelId,
    })
  }

  const pineconeIndex = pinecone.Index("developers")
  const vectorStore = await PineconeStore.fromExistingIndex(embeddingModel, {
    pineconeIndex,
    namespace: datasource.id,
  })

  const results = await vectorStore.similaritySearch(
    messages[messages.length - 1].content || prompt,
    parseInt(similaritySearchLength) || 5
  )

  const undrstnd = undrstnd_client(api_token.tokenGr)
  const undrstnd_data = {
    model: undrstnd(model.id),
    system: results.map((result) => result.pageContent).join("\n\n"),
    ...(prompt ? { prompt } : {}),
    ...(messages ? { messages: convertToCoreMessages(messages) } : {}),
  } as any

  let token_used: number
  if (stream === false) {
    const result = await generateText(undrstnd_data)

    token_used = result.usage.totalTokens
    const consumption = token_used * (model.pricing / 1000000) * 1.5

    try {
      const [funding, usage] = await Promise.all([
        updateFunding(api_token.userId, consumption),
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
          amount: (funding as Funding).amount.toString(),
          currency: (funding as Funding).currency,
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

      return getErrorResponse({
        status: 500,
        req_token,
        modelId,
      })
    }
  } else if (stream === true) {
    const result = await streamText(undrstnd_data)

    token_used = (await result.usage).totalTokens
    const consumption = token_used * (model.pricing / 1000000) * 1.5

    try {
      await Promise.all([
        updateFunding(api_token.userId, consumption),
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

      return getErrorResponse({
        status: 500,
        req_token,
        modelId,
      })
    }

    return result.toDataStreamResponse()
  }
}
