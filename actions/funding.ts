"use server"

import { db } from "@/lib/prisma"

/**
 * This function retrieves the funding information for a given user.
 *
 * @param userId - The unique identifier of the user.
 *
 * @returns A promise that resolves to the funding information if found, or an error object if not found.
 *
 * ### Explanation:
 * - The function takes one parameter: `userId` (a string).
 * - It queries the database to find the funding information for the specified user.
 * - If funding information is not found, it returns an empty object.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - The function returns a promise that resolves to either the funding object or an empty object.
 */
export async function getFunds(userId: string) {
  return await db.funding.findFirst({
    where: {
      userId: userId,
    },
  })
}

/**
 * This function updates the funding information for a given user.
 *
 * @param userId - The unique identifier of the user.
 * @param modelId - The unique identifier of the used model.
 * @param amount - The amount to be deducted from the user's funding.
 * @param shouldReturn - A boolean flag indicating whether an error should be returned if funding is not found. Defaults to true. Use this when working with API endpoints and NOT server actions.
 *
 * @returns A promise that resolves to the funding information if found, or an error object if not found.
 *
 * ### Explanation:
 * - The function takes three parameters: `userId` (a string), `modelId` (a string), and `amount` (a number).
 * - It queries the database to find the funding information for the specified user.
 * - If funding information is not found, it returns an error object using the `returnError` function.
 * - If the user's balance is less than the specified amount, it returns an error object using the `returnError` function.
 * - If the user's balance is sufficient, it updates the funding information by deducting the specified amount.
 * - It returns the updated funding object.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - `modelId`: A string representing the unique identifier of the used model.
 * - `amount`: A number representing the amount to be deducted from the user's funding.
 * - `shouldReturn`: A boolean indicating whether to return an error if funding is not found. Defaults to true.
 * - The function returns a promise that resolves to the updated funding object.
 */
export async function updateFunding(userId: string, amount: number) {
  const funding = await getFunds(userId)

  if (!funding) {
    return null
  }

  if (funding.amount < amount) {
    return null
  }

  return await db.funding.update({
    where: {
      id: funding.id,
      userId: userId,
    },
    data: {
      amount: funding.amount - amount,
    },
  })
}

/**
 * This function creates a funding record for a user.
 *
 * @param userId - The unique identifier of the user.
 * @param amount - The amount of funding to create.
 * @param currency - The currency of the funding to create.
 *
 * @returns A promise that resolves to the created funding.
 *
 * ### Explanation:
 * - The function takes three parameters: `userId` (a string), `amount` (a number) and `currency` (a string).
 * - It creates a funding record in the database with the specified parameters.
 * - It returns the created funding.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - `amount`: A number representing the amount of funding to create.
 * - `currency`: A string representing the currency of the funding to create.
 * - The function returns a promise that resolves to the created funding.
 */
export async function createFunding(
  userId: string,
  amount: number,
  currency: string
) {
  return await db.funding.create({
    data: {
      userId,
      amount,
      currency,
    },
  })
}
