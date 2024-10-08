import React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: "Usage",
  description: "View detailed informations of your API logs.",
})

export default async function UsagePage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }
  return <div>UsagePage</div>
}
