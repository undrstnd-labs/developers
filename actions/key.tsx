"use server"

import { db } from "@/lib/prisma"

export async function getKeys(userId: string) {
  return await db.aPIToken.findMany({
    where: {
      userId: userId,
    },
  })
}

export async function createKey(userId: string) {
  return await db.aPIToken.create({
    data: {
      userId: userId,
      token: `udsk_${Math.random().toString(36).substring(2)}`,
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
  data: { name: string; deletedAt: Date }
) {
  return await db.aPIToken.update({
    where: {
      userId: userId,
      id: tokenId,
    },
    data: {
      name: data.name,
      deletedAt: data.deletedAt,
    },
  })
}
