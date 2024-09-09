import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { returnError } from "@/lib/api"
import { db } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const headersList = headers()
  const body = await request.json()

  const { apiKey } = body
  const req_token = headersList.get("x-api-key") as string

  const api_token = await db.aPIToken.findFirst({
    where: {
      id: apiKey || req_token,
      deletedAt: null,
    },
  })

  if (!api_token) {
    return returnError({
      error: "ERROR: Invalid API token.",
      status: 401,
    })
  }

  return NextResponse.json({ token: api_token.token })
}
