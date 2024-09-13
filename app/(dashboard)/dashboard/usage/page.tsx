import React from "react"
import { redirect } from "next/navigation"

import { getAuthedUser } from "@/actions/session"

export default async function UsagePage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }
  return <div>UsagePage</div>
}
