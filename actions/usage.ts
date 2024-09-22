"use server"

import { db } from "@/lib/prisma"

/**
 * This function gets the usage of a user.
 *
 * @param userId - The unique identifier of the user.
 *
 * @returns A promise that resolves to the usage of the user.
 *
 * ### Explanation:
 * - The function takes the following parameter: `userId`.
 * - It gets the usage of the user from the database.
 * - It returns the usage of the user.
 *
 * ### Types:
 * - `userId` is the unique identifier of the user, in string format.
 * - The function returns a promise that resolves to the usage of the user.
 */
export async function getUsage(userId: string) {
  return await db.usage.findFirst({
    where: {
      userId: userId,
    },
  })
}

/**
 * This function creates a usage record.
 *
 * @param userId - The unique identifier of the user.
 * @param requestId - The unique identifier of the request.
 * @param tokensUsed - The number of tokens used.
 * @param cost - The cost of the usage.
 *
 * @returns A promise that resolves to the created usage.
 *
 * ### Explanation:
 * - The function takes the following parameters: `userId`, `requestId`, `tokensUsed`, and `cost`.
 * - It creates a usage record in the database with the specified parameters.
 * - It returns the created usage.
 *
 * ### Types:
 * - `userId` is the unique identifier of the user, in string format.
 * - `requestId` is the unique identifier of the request, in string format.
 * - `tokensUsed` is the number of tokens used, in number format.
 * - `cost` is the cost of the usage, in number format.
 * - The function returns a promise that resolves to the created usage.
 */
export async function createUsage(
  userId: string,
  requestId: string,
  tokensUsed: number,
  cost: number
) {
  return await db.usage.create({
    data: {
      tokensUsed,
      userId,
      cost,
      requestId,
    },
  })
}
