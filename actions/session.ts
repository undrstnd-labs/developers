import { auth } from "@/lib/auth"

export async function getAuthedUser() {
  const session = await auth()
  return session?.user ?? false
}
