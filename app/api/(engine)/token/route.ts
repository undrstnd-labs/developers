import { NextRequest, NextResponse } from "next/server"

import { returnError } from "@/lib/api"
import { db } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams

  const req_token = searchParams.get("x-api-key") as string
  const api_token = await db.aPIToken.findFirst({
    where: {
      id: req_token,
      deletedAt: null,
    },
  })

  if (!api_token) {
    return returnError({
      error: "ERROR: Invalid API token.",
      status: 401,
    })
  }

  return NextResponse.json({ token: api_token.tokenGr })
}
