"use server"

import { Request, RequestStatus } from "@prisma/client"

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
  const chartData: {
    date: string
    success: number
    failed: number
  }[] = []

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().split("T")[0]
    const dailyRequests = requests.filter(
      (request) => request.createdAt.toISOString().split("T")[0] === dateString
    )

    const success = dailyRequests.filter(
      (request) => request.status === "SUCCESS"
    ).length
    const failed = dailyRequests.filter(
      (request) => request.status === "FAILED" || request.status === "PENDING"
    ).length

    chartData.push({ date: dateString, success, failed })
  }

  return chartData
}
