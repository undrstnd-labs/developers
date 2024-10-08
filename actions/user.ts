"use server"

import { User } from "@prisma/client"

import { db } from "@/lib/prisma"

/**
 * This function checks if a user is banned.
 *
 * @param email - The email of the user.
 *
 * @returns A boolean value indicating if the user is banned.
 *
 * ### Explanation:
 * - The function takes the following parameter: `email`.
 * - It checks if the user is banned by querying the database.
 * - It returns a boolean value indicating if the user is banned.
 *
 * ### Types:
 * - `email` is the email of the user, in string format.
 * - The function returns a boolean value indicating if the user is banned.
 */
export async function isBanned(email: string) {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })

  return user?.deletedAt ? true : false
}

/**
 * This function bans a user.
 *
 * @param id - The unique identifier of the user.
 *
 * @returns A promise that resolves to the updated user.
 *
 * ### Explanation:
 * - The function takes the following parameter: `id`.
 * - It bans the user by setting the `deletedAt` field to the current date.
 * - It returns the updated user.
 *
 * ### Types:
 * - `id` is the unique identifier of the user, in string format.
 * - The function returns a promise that resolves to the updated user.
 */
export async function banUser(id: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

/**
 * This function pardons a user.
 *
 * @param id - The unique identifier of the user.
 *
 * @returns A promise that resolves to the updated user.
 *
 * ### Explanation:
 * - The function takes the following parameter: `id`.
 * - It pardons the user by setting the `deletedAt` field to `null`.
 * - It returns the updated user.
 *
 * ### Types:
 * - `id` is the unique identifier of the user, in string format.
 * - The function returns a promise that resolves to the updated user.
 */
export async function pardonUser(id: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: null,
    },
  })
}

/**
 * This function gets a user by email.
 *
 * @param email - The email of the user.
 *
 * @returns A promise that resolves to the user.
 *
 * ### Explanation:
 * - The function takes the following parameter: `email`.
 * - It gets the user by email from the database.
 * - It returns the user.
 *
 * ### Types:
 * - `email` is the email of the user, in string format.
 * - The function returns a promise that resolves to the user.
 */
export async function updateUser(email: string, data: Partial<User>) {
  return await db.user.update({
    where: {
      email,
    },
    data,
  })
}

/**
 * This function checks if a user is registered.
 *
 * @param email - The email of the user.
 *
 * @returns A boolean value indicating if the user is registered.
 *
 * ### Explanation:
 * - The function takes the following parameter: `email`.
 * - It checks if the user is registered by querying the database.
 * - It returns a boolean value indicating if the user is registered.
 *
 * ### Types:
 * - `email` is the email of the user, in string format.
 * - The function returns a boolean value indicating if the user is registered.
 */
export async function isRegisteredUser(email: string) {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })

  return user?.name ? true : false
}
