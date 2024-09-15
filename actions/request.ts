"use server"

import { Request, RequestStatus } from "@prisma/client"

import { ChartDataType } from "types"

import { db } from "@/lib/prisma"

export async function createRequest({
  response,
  request,
  parameters,
  endpoint,
  userId,
  status,
  apiTokenId,
}: {
  response: string
  request: any
  parameters: any
  endpoint: string
  userId: string
  status: RequestStatus
  apiTokenId: string
}) {
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

export async function updateRequest({
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

  // Group requests by date
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
