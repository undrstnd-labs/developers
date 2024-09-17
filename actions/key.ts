"use server"

import { env } from "@/env.mjs"

import { generateId } from "@/lib/api"
import { db } from "@/lib/prisma"

export async function getKeys(userId: string) {
  return await db.aPIToken.findMany({
    where: {
      userId: userId,
    },
  })
}

export async function createKey(userId: string, name: string) {
  return await db.aPIToken.create({
    data: {
      userId: userId,
      token: env.GROQ_API_KEY_DEFAULT,
      id: generateId(38),
      name: name,
    },
  })
}

export async function deleteKey(userId: string, tokenId: string) {
  return await db.aPIToken.update({
    where: {
      userId: userId,
      id: tokenId,
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

export async function updateKey(
  userId: string,
  tokenId: string,
  data: { name?: string; deletedAt?: Date; verified?: boolean }
) {
  return await db.aPIToken.update({
    where: {
      userId: userId,
      id: tokenId,
    },
    data: {
      name: data.name,
      deletedAt: data.deletedAt,
      verified: data.verified,
    },
  })
}
