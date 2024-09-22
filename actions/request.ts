"use server"

import { Request, RequestStatus } from "@prisma/client"

import { ChartDataType } from "types"

import { db } from "@/lib/prisma"

interface CreateRequestAPIProps {
  request: any
  response: string
  userId: string
  status: RequestStatus
  parameters: any
  endpoint: string
  apiTokenId: string
}

/**
 * This function creates a new request for an API, used when calling an API.
 *
 * @param request - The request sent to the API.
 * @param response - The response from the API.
 * @param parameters - The parameters sent to the API.
 * @param endpoint - The endpoint of the API.
 * @param userId - The unique identifier of the user.
 * @param status - The status of the request.
 * @param apiTokenId - The unique identifier of the API token.
 *
 * @returns A promise that resolves to the newly created request.
 *
 * ### Explanation:
 * - The function takes the following parameters: `request`, `response`, `parameters`, `endpoint`, `userId`, `status`, and `apiTokenId`.
 * - It creates a new request in the database with the specified fields.
 * - It returns the newly created request.
 *
 * ### Types:
 * - `request` is the request sent to the API, in JSON format.
 * - `response` is the response from the API, in string format.
 * - `parameters` are the parameters sent to the API, in JSON format.
 * - `endpoint` is the endpoint of the API, in string format.
 * - `userId` is the unique identifier of the user, in string format.
 * - `status` is the status of the request, in RequestStatus format.
 * - `apiTokenId` is the unique identifier of the API token, in string format.
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

/**
 * This function creates a new request for an action used when performing an action.
 *
 * @param response - The response from the action.
 * @param request - The request sent to the action.
 * @param parameters - The parameters sent to the action.
 * @param action - The action performed.
 * @param userId - The unique identifier of the user.
 * @param status - The status of the request.
 * @param resourceTokenId - The unique identifier of the resource token.
 *
 * @returns A promise that resolves to the newly created request.
 *
 * ### Explanation:
 * - The function takes the following parameters: `response`, `request`, `parameters`, `action`, `userId`, `status`, and `resourceTokenId`.
 * - It creates a new request in the database with the specified fields.
 * - It returns the newly created request.
 *
 * ### Types:
 * - `response` is the response from the action, in string format.
 * - `request` is the request sent to the action, in JSON format.
 * - `parameters` are the parameters sent to the action, in JSON format.
 * - `action` is the action performed, in string format.
 * - `userId` is the unique identifier of the user, in string format.
 * - `status` is the status of the request, in RequestStatus format.
 * - `resourceTokenId` is the unique identifier of the resource token, in string format.
 * - The function returns a promise that resolves to the updated API key.
 */
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

/**
 * This function updates a request with the specified response and status.
 *
 * @param id - The unique identifier of the request.
 * @param response - The response to update the request with.
 * @param status - The status to update the request with.
 *
 * @returns A promise that resolves to the updated request.
 *
 * ### Explanation:
 * - The function takes the following parameters: `id`, `response`, and `status`.
 * - It updates the request in the database with the specified response and status.
 * - It returns the updated request.
 *
 * ### Types:
 * - `id` is the unique identifier of the request, in string format.
 * - `response` is the response to update the request with, in string format.
 * - `status` is the status to update the request with, in RequestStatus format.
 * - The function returns a promise that resolves to the updated request.
 */
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

/**
 * This function retrieves all requests made by a user within a specified date range.
 *
 * @param userId - The unique identifier of the user.
 * @param startDate - The start date of the date range.
 * @param endDate - The end date of the date range.
 *
 * @returns A promise that resolves to an array of requests made by the user within the specified date range.
 *
 * ### Explanation:
 * - The function takes the following parameters: `userId`, `startDate`, and `endDate`.
 * - It retrieves all requests made by the user within the specified date range from the database.
 * - It returns an array of requests made by the user within the specified date range.
 *
 * ### Types:
 * - `userId` is the unique identifier of the user, in string format.
 * - `startDate` is the start date of the date range, in Date format.
 * - `endDate` is the end date of the date range, in Date format.
 * - The function returns a promise that resolves to an array of requests made by the user within the specified date range.
 */
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

/**
 * This function retrieves the chart data for the requests made by a user within a specified date range.
 *
 * @param requests - An array of requests made by the user.
 * @param startDate - The start date of the date range.
 * @param endDate - The end date of the date range.
 *
 * @returns An array of objects representing the chart data for the requests made by the user within the specified date range.
 *
 * ### Explanation:
 * - The function takes the following parameters: `requests`, `startDate`, and `endDate`.
 * - It maps the requests to daily requests based on the date of creation.
 * - It calculates the number of successful and failed requests for each day within the specified date range.
 * - It returns an array of objects representing the chart data for the requests made by the user within the specified date range.
 *
 * ### Types:
 * - `requests` is an array of requests made by the user.
 * - `startDate` is the start date of the date range, in Date format.
 * - `endDate` is the end date of the date range, in Date format.
 * - The function returns an array of objects representing the chart data for the requests made by the user within the specified date range.
 */
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
