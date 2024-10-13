"use server"

import { Resource } from "@prisma/client"

import { db } from "@/lib/prisma"

import { getFunds, updateFunding } from "@/actions/funding"
import { createRequestAction, updateRequest } from "@/actions/request"
import { createUsage } from "@/actions/usage"

/**
 * This function gets all the resources of a user.
 *
 * @param userId  - The unique identifier of the user.
 *
 * @returns A promise that resolves to an array of resources.
 *
 * ### Explanation:
 * - The function takes the following parameter: `userId`.
 * - It gets all the resources of the user from the database.
 * - It returns an array of resources.
 *
 * ### Types:
 * - `userId` is the unique identifier of the user, in string format.
 * - The function returns a promise that resolves to an array of resources.
 */
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

/**
 * This function gets a resource of a user.
 *
 * @param userId  - The unique identifier of the user.
 * @param resourceId  - The unique identifier of the resource.
 *
 * @returns A promise that resolves to the resource.
 *
 * ### Explanation:
 * - The function takes the following parameters: `userId` and `resourceId`.
 * - It gets the resource of the user from the database.
 * - It returns the resource.
 *
 * ### Types:
 * - `userId` is the unique identifier of the user, in string format.
 * - `resourceId` is the unique identifier of the resource, in string format.
 * - The function returns a promise that resolves to the resource.
 */
export async function getResource(userId: string, resourceId: string) {
  return await db.resource.findFirst({
    where: {
      userId,
      id: resourceId,
    },
  })
}

interface CreateResourceProps {
  id: string
  userId: string
  name: string
  description: string
  type: string
  url: string
  size: number
  handle: string
}

/**
 * This function creates a resource for a user.
 *
 * @param id - The unique identifier of the resource.
 * @param userId - The unique identifier of the user.
 * @param name - The name of the resource.
 * @param handle - The handle of the resource.
 * @param description - The description of the resource.
 * @param type - The type of the resource.
 * @param url - The URL of the resource.
 * @param size - The size of the resource.
 *
 * @returns A promise that resolves to the created resource.
 *
 * ### Explanation:
 * - The function takes the following parameters: `id`, `userId`, `name`, `handle`, `description`, `type`, `url`, and `size`.
 * - It creates a resource for the user in the database.
 * - It returns the created resource.
 *
 * ### Types:
 * - `id` is the unique identifier of the resource, in string format.
 * - `userId` is the unique identifier of the user, in string format.
 * - `name` is the name of the resource, in string format.
 * - `handle` is the handle of the resource, in string format.
 * - `description` is the description of the resource, in string format.
 * - `type` is the type of the resource, in string format.
 * - `url` is the URL of the resource, in string format.
 * - `size` is the size of the resource, in number format.
 * - The function returns a promise that resolves to the created resource.
 */
export async function createResource({
  id,
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
      id,
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

/**
 * This function calculates the resource usage when uploading and embedding for a user.
 *
 * @param id  - The unique identifier of the resource.
 * @param userId  - The unique identifier of the user.
 * @param size  - The size of the resource.
 *
 * ### Explanation:
 * - The function takes the following parameters: `id`, `userId`, and `size`.
 * - It calculates the resource usage when uploading and embedding for the user.
 * - It creates a request action to upload the resource and estimate the tokens costs.
 *
 * ### Types:
 * - `id` is the unique identifier of the resource, in string format.
 * - `userId` is the unique identifier of the user, in string format.
 * - `size` is the size of the resource, in number format.
 * - The function does not return anything.
 *
 * ### TODO:
 * - Edit `consumption` to be calculated based on the size of the resource.
 */
export async function calculateResourceUsageUpload(
  id: string,
  userId: string,
  size: number
) {
  const FILE_SIZE = size
  const TOKEN_SIZE = 51_200_000
  const TOKEN_USED = FILE_SIZE / TOKEN_SIZE
  const consumption = TOKEN_USED * 1.5

  const [request, funding] = await Promise.all([
    createRequestAction({
      response: "PENDING: Request in progress.",
      request: "Upload resource & estimate tokens costs",
      parameters: {
        size,
        consumption,
      },
      action: "calculateResourceUsageUpload",
      userId,
      status: "PENDING",
    }),
    getFunds(userId),
  ])

  if (!funding || funding.amount - consumption < 0) {
    return updateRequest({
      id: request.id,
      response: "ERROR: Insufficient balance.",
      status: "FAILED",
    })
  }

  await Promise.all([
    updateFunding(userId, consumption),
    createUsage(userId, request.id, Math.ceil(FILE_SIZE / 1024), consumption),
    updateRequest({
      id: request.id,
      response: "SUCCESS: Resource uploaded.",
      status: "SUCCESS",
      resourceTokenId: id,
    }),
  ])
}

/**
 * This function edits a resource for a user.
 *
 * @param id - The unique identifier of the resource.
 * @param userId - The unique identifier of the user.
 * @param data - The data to update the resource.
 *
 * @returns A promise that resolves to the updated resource.
 *
 * ### Explanation:
 * - The function takes the following parameters: `id`, `userId`, and `data`.
 * - It updates the resource for the user in the database.
 * - It returns the updated resource.
 *
 * ### Types:
 * - `id` is the unique identifier of the resource, in string format.
 * - `userId` is the unique identifier of the user, in string format.
 * - `data` is the data to update the resource, in Partial format.
 * - The function returns a promise that resolves to the updated resource.
 */
export async function editResource(
  id: string,
  userId: string,
  data: Partial<Resource>
) {
  return await db.resource.update({
    where: {
      id,
      userId,
    },
    data,
  })
}
