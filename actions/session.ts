import { auth } from "@/lib/auth"

/**
 * This function gets the authenticated user.
 *
 * @returns A promise that resolves to the authenticated user.
 *
 * ### Explanation:
 * - The function gets the authenticated user from the session.
 * - It returns the authenticated user.
 *
 * ### Types:
 * - The function returns a promise that resolves to the authenticated user.
 */
export async function getAuthedUser() {
  const session = await auth()
  return session?.user ?? false
}
