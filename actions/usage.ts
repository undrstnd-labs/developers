"use server"

import { db } from "@/lib/prisma"

export async function getUsage(userId: string) {
  return await db.usage.findFirst({
    where: {
      userId: userId,
    },
  })
}

export async function createUsage(userId: string, tokensUsed: number) {
  return await db.usage.create({
    data: {
      tokensUsed: tokensUsed,
      userId: userId,
    },
  })
}