import { NextResponse } from "next/server"

import { models } from "@/config/models"

export async function GET() {
  return NextResponse.json({
    models: models,
  })
}
