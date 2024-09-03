"use server"

import { db } from "@/lib/prisma"

export async function getUsage(userId: string) {
  return await db.usage.findFirst({
    where: {
      userId: userId,
    },
  })
}

export async function createUsage(
  userId: string,
  tokensUsed: number,
  cost: number
) {
  return await db.usage.create({
    data: {
      tokensUsed,
      userId,
      cost,
    },
  })
}
