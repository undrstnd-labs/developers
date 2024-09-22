import { NextResponse } from "next/server"

import { getFunds } from "@/actions/funding"

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

export async function getFunding(
  userId: string,
  modelId: string = "",
  shouldReturn: boolean = true
) {
  const funding = await getFunds(userId)

  if (!funding) {
    return (
      shouldReturn &&
      returnError({
        error: "ERROR: Funding not found.",
        status: 404,
        userId: userId,
        modelId,
      })
    )
  }

  return funding
}

export function generateId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = "udsk_"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
