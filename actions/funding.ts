"use server"

import { returnError } from "@/lib/api"
import { db } from "@/lib/prisma"

export async function getFunding(userId: string, modelId: string) {
  const funding = await db.funding.findFirst({
    where: {
      userId: userId,
    },
  })

  if (!funding) {
    return returnError({
      error: "ERROR: Funding not found.",
      status: 404,
      userId: userId,
      modelId,
    })
  }

  return funding
}

export async function updateFunding(
  userId: string,
  modelId: string,
  amount: number
) {
  const funding = await db.funding.findFirst({
    where: {
      userId: userId,
    },
  })

  if (!funding) {
    return returnError({
      error: "ERROR: Funding not found.",
      status: 404,
      userId: userId,
      modelId,
    })
  }

  if (funding.amount < amount) {
    return returnError({
      error: "ERROR: Insufficient balance.",
      status: 400,
      userId: userId,
      modelId,
    })
  }

  return await db.funding.update({
    where: {
      id: funding.id,
      userId: userId,
    },
    data: {
      amount: funding.amount - amount,
    },
  })
}
