"use server"

import { db } from "@/lib/prisma"

import { getFunding, updateFunding } from "@/actions/funding"
import { createRequestAction, updateRequestAPI } from "@/actions/request"
import { createUsage } from "@/actions/usage"

export async function getResources(userId: string) {
  return await db.resource.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getResource(userId: string, resourceId: string) {
  return await db.resource.findFirst({
    where: {
      userId,
      id: resourceId,
    },
  })
}

interface CreateResourceProps {
  id: string
  userId: string
  name: string
  description: string
  type: string
  url: string
  size: number
  handle: string
}

export async function createResource({
  id,
  userId,
  name,
  handle,
  description,
  type,
  url,
  size,
}: CreateResourceProps) {
  return await db.resource.create({
    data: {
      id,
      name,
      handle,
      description,
      userId,
      type,
      url,
      size,
    },
  })
}

export async function calculateResourceUsageUpload(
  id: string,
  userId: string,
  size: number
) {
  const FILE_SIZE = size
  const TOKEN_SIZE = 1024 * 10000
  const consumption = (FILE_SIZE / TOKEN_SIZE) * 1.5

  const [request, funding] = await Promise.all([
    createRequestAction({
      response: "PENDING: Request in progress.",
      request: "Upload resource & estimate tokens costs",
      parameters: {
        size,
        consumption,
      },
      action: "calculateResourceUsageUpload",
      userId,
      status: "PENDING",
      resourceTokenId: id,
    }),
    getFunding(userId, false),
  ])

  if (!funding || funding.amount - consumption < 0) {
    return updateRequestAPI({
      id: request.id,
      response: "ERROR: Insufficient balance.",
      status: "FAILED",
    })
  }

  const newAmount = funding.amount - consumption

  await Promise.all([
    updateFunding(userId, "text-embedding-3-small", newAmount, false),
    createUsage(userId, request.id, FILE_SIZE / TOKEN_SIZE, consumption),
    updateRequestAPI({
      id: request.id,
      response: "SUCCESS: Resource uploaded.",
      status: "SUCCESS",
    }),
  ])
}
