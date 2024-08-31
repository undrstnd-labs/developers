import { NextResponse } from "next/server"
import * as z from "zod"
import {models} from "@/config/models"
import { db } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    modelId: z.string().refine((value) => {
      return models.some((model) => model.id === value)
    }, {
      message: "ERROR: Invalid 'modelId' parameter.",
    }),
  }),
})
export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
    const {
    params: { modelId},
  } = routeContextSchema.parse(context)

}
