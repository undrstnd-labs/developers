import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { UserType } from "@prisma/client"

import { constructMetadata } from "@/lib/utils"

import { createFunding, getFunds } from "@/actions/funding"
import { getAuthedUser } from "@/actions/session"
import { updateUser } from "@/actions/user"

export const metadata: Metadata = constructMetadata({
  title: `Profile onboarding`,
  description: `Onboarding page for the user profile`,
})

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const funds = await getFunds(user.id)
  if (!funds || funds.userId !== user.id) {
    await createFunding(user.id, 3, "eur")
  }

  if (searchParams?.name || searchParams?.type) {
    await updateUser(user.email, {
      name: searchParams.name as string,
      type: (searchParams.type as UserType) || UserType.DEVELOPER,
      verified: true,
      image: `https://avatar.vercel.sh/${searchParams.name}.svg?text=${searchParams.name![0].toUpperCase()}`,
    })
  }

  return redirect("/dashboard")
}
