"use server"

import { env } from "@/env.mjs"

import { generateId } from "@/lib/api"
import { db } from "@/lib/prisma"

/**
 * This function retrieves the API keys for a given user.
 *
 * @param userId - The unique identifier of the user.
 *
 * @returns A promise that resolves to the API keys for the user.
 *
 * ### Explanation:
 * - The function takes one parameter: `userId` (a string).
 * - It queries the database to find the API keys for the specified user.
 * - It returns the API keys for the user.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - The function returns a promise that resolves to the API keys for the user.
 */
export async function getKeys(userId: string) {
  return await db.aPIToken.findMany({
    where: {
      userId: userId,
    },
  })
}

/**
 * This function creates a new API key for a given user.
 *
 * @param userId - The unique identifier of the user.
 * @param name - The name of the API key.
 *
 * @returns A promise that resolves to the newly created API key.
 *
 * ### Explanation:
 * - The function takes two parameters: `userId` (a string) and `name` (a string).
 * - It generates a new API key using the `generateId` function.
 * - It creates a new API key in the database with the generated key, user ID, and name.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - `name`: A string representing the name of the API key.
 * - The function returns a promise that resolves to the newly created API key.
 */
export async function createKey(userId: string, name: string) {
  return await db.aPIToken.create({
    data: {
      userId: userId,
      token: env.GROQ_API_KEY_DEFAULT,
      id: generateId(38),
      name: name,
    },
  })
}

/**
 * This function deletes an API key for a given user.
 *
 * @param userId - The unique identifier of the user.
 * @param tokenId - The unique identifier of the API key.
 *
 * @returns A promise that resolves to the deleted API key.
 *
 * ### Explanation:
 * - The function takes two parameters: `userId` (a string) and `tokenId` (a string).
 * - It updates the API key in the database to mark it as deleted.
 *
 * ### Types:
 * - `userId`: A string representing the unique identifier of the user.
 * - `tokenId`: A string representing the unique identifier of the API key.
 * - The function returns a promise that resolves to the deleted API key.
 */
export async function deleteKey(userId: string, tokenId: string) {
  return await db.aPIToken.update({
    where: {
      userId: userId,
      id: tokenId,
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

/**
 * This function updates an API key for a given user.
 *
 * @param userId - The unique identifier of the user.
 * @param tokenId - The unique identifier of the API key.
 * @param data - An object containing the fields to update.
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
export async function updateKey(
  userId: string,
  tokenId: string,
  data: { name?: string; deletedAt?: Date; verified?: boolean }
) {
  return await db.aPIToken.update({
    where: {
      userId: userId,
      id: tokenId,
    },
    data: {
      name: data.name,
      deletedAt: data.deletedAt,
      verified: data.verified,
    },
  })
}
