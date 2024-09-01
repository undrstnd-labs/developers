"use server"

import { db } from "@/lib/prisma"

export async function createRequest(
  response: any,
  parameters: any,
  endpoint: string,
  userId: string
) {
  await db.request.create({
    data: {
      response,
      parameters,
      endpoint,
      userId,
    },
  })
}
