"use server"

import { db } from "@/lib/prisma"

export async function createRequest({
  response,
  request,
  parameters,
  endpoint,
  userId,
}: {
  response: string
  request: any
  parameters: any
  endpoint: string
  userId: string
}) {
  return await db.request.create({
    data: {
      response,
      request,
      parameters,
      endpoint,
      userId,
    },
  })
}
