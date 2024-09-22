"use server"

import { Request, RequestStatus } from "@prisma/client"

import { ChartDataType } from "types"

import { db } from "@/lib/prisma"

interface CreateRequestAPIProps {
  request: any // Request sent to the API 'JSON'
  response: string // Response from the API: 'string'
  userId: string // User ID: 'string'
  status: RequestStatus // Status of the request: 'RequestStatus'
  parameters: any // Parameters sent to the API 'JSON'
  endpoint: string // Endpoint of the API: 'string'
  apiTokenId: string // API Token ID: 'string'
}

/**
 * This function creates a new API request entry in the database.
 *
 * @param response:
 *
 * @returns A promise that resolves to the updated API key.
 *
 * ### Explanation:
 * - The function takes three parameters: `userId` (a string), `tokenId` (a string), and `data` (an object).
 * - It updates the API key in the database with the specified fields.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - `tokenId`: A string representing the unique identifier of the API key.
 * - `data`: An object containing the fields to update; possible fields are `name`, `deletedAt`, and `verified`.
 *  -- `name`: A string representing the name of the API key.
 *  -- `deletedAt`: A date representing the deletion date of the API key.
 *  -- `verified`: A boolean indicating whether the API key is verified.
 * - The function returns a promise that resolves to the updated API key.
 */
export async function createRequestAPI({
  response,
  request,
  parameters,
  endpoint,
  userId,
  status,
  apiTokenId,
}: CreateRequestAPIProps) {
  return await db.request.create({
    data: {
      status,
      response,
      request,
      parameters,
      endpoint,
      userId,
      apiTokenId,
    },
  })
}

interface CreateRequestActionProps {
  response: string
  request: any
  parameters: any
  action: string
  userId: string
  status: RequestStatus
  resourceTokenId: string
}

export async function createRequestAction({
  response,
  request,
  parameters,
  action,
  userId,
  status,
  resourceTokenId,
}: CreateRequestActionProps) {
  return await db.request.create({
    data: {
      status,
      response,
      request,
      parameters,
      endpoint: action,
      userId,
      resourceTokenId,
    },
  })
}

export async function updateRequestAPI({
  id,
  response,
  status,
}: {
  id: string
  response: string
  status: RequestStatus
}) {
  return await db.request.update({
    where: {
      id,
    },
    data: {
      status,
      response,
    },
  })
}

export async function getRequests(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return await db.request.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })
}

export async function getChartData(
  requests: Request[],
  startDate: Date,
  endDate: Date
) {
  const dailyRequestsMap = new Map<string, Request[]>()

  for (const request of requests) {
    const dateString = request.createdAt.toLocaleDateString()
    if (!dailyRequestsMap.has(dateString)) {
      dailyRequestsMap.set(dateString, [])
    }
    dailyRequestsMap.get(dateString)?.push(request)
  }

  const chartData: ChartDataType[] = []

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toLocaleDateString()
    const dailyRequests = dailyRequestsMap.get(dateString) || []

    const { success, failed } = dailyRequests.reduce(
      (acc, request) => {
        if (request.status === "SUCCESS") {
          acc.success++
        } else if (
          request.status === "FAILED" ||
          request.status === "PENDING"
        ) {
          acc.failed++
        }
        return acc
      },
      { success: 0, failed: 0 }
    )

    chartData.push({ date: dateString, success, failed })
  }

  return chartData
}
