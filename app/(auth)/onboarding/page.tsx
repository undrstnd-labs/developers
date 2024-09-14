import React from "react"
import { redirect } from "next/navigation"
import { UserType } from "@prisma/client"

import { getAuthedUser } from "@/actions/session"
import { updateUser } from "@/actions/user"

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  if (searchParams?.name || searchParams?.type) {
    console.log(searchParams)
    await updateUser(user.email, {
      username: searchParams.name as string,
      type: searchParams.type as UserType,
    })
  }

  return redirect("/dashboard")
}
