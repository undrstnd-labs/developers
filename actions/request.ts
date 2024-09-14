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
  apiTokenId,
}: {
  response: string
  request: any
  parameters: any
  endpoint: string
  userId: string
  status: RequestStatus
  apiTokenId: string
}) {
  return await db.request.create({
    data: {
      status,
      response,
      request,
      parameters,
      endpoint,
      userId,
      apiTokenId,
    },
  })
}

export async function updateRequest({
  id,
  response,
  status,
}: {
  id: string
  response: string
  status: RequestStatus
}) {
  return await db.request.update({
    where: {
      id,
    },
    data: {
      status,
      response,
    },
  })
}

export async function getRequests(userId: string, period: number) {
  return await db.request.findMany({
    where: {
      userId,
      createdAt: {
        gte: new Date(Date.now() - period),
      },
    },
  })
}
