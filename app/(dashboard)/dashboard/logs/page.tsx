import React from "react"
import { redirect } from "next/navigation"

import { getAuthedUser } from "@/actions/session"

export default async function LogsPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }
  return <div>LogsPage</div>
}
