"use server"

import { db } from "@/lib/prisma"
import { generateDataSourceId } from "@/lib/utils"

export async function getResources(userId: string) {
  return await db.resource.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getResource(userId: string, resourceId: string) {
  return await db.resource.findFirst({
    where: {
      userId,
      id: resourceId,
    },
  })
}

interface CreateResourceProps {
  userId: string
  name: string
  description: string
  type: string
  url: string
  size: number
  handle: string
}

export async function createResource({
  userId,
  name,
  handle,
  description,
  type,
  url,
  size,
}: CreateResourceProps) {
  return await db.resource.create({
    data: {
      id: generateDataSourceId(),
      name,
      handle,
      description,
      userId,
      type,
      url,
      size,
    },
  })
}
