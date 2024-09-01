import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"

export function returnError({
  error,
  modelId,
  userId,
  status,
}: {
  error: string
  status: number
  modelId?: string
  userId?: string
}) {
  NextResponse.json(
    {
      error,
      modelId,
      userId,
      date: new Date().toISOString(),
    },
    { status }
  )
}

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
