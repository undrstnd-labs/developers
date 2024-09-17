import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

import { models } from "@/config/models"
import { getModel } from "@/lib/utils"

const routeContextSchema = z.object({
  params: z.object({
    modelId: z.string().refine(
      (value) => {
        return models.some((model) => model.id === value)
      },
      {
        message: "ERROR: Invalid 'modelId' parameter.",
      }
    ),
  }),
})

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const {
    params: { modelId },
  } = routeContextSchema.parse(context)

  return NextResponse.json({
    model: getModel(modelId),
  })
}
