"use server"

import { RequestStatus } from "@prisma/client"

import { db } from "@/lib/prisma"

export async function createRequest({
  response,
  request,
  parameters,
  endpoint,
  userId,
  status,
}: {
  response: string
  request: any
  parameters: any
  endpoint: string
  userId: string
  status: RequestStatus
}) {
  return await db.request.create({
    data: {
      status,
      response,
      request,
      parameters,
      endpoint,
      userId,
    },
  })
}

export async function updateRequest({
  id,
  response,
  status,
  usageId,
}: {
  id: string
  response: string
  status: RequestStatus
  usageId?: string
}) {
  return await db.request.update({
    where: {
      id,
    },
    data: {
      status,
      response,
      usageId,
    },
  })
}
