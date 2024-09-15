import React from "react"
import { redirect } from "next/navigation"

import { DashboardApiKeyCreate } from "@/components/app/dashboard-api-key-create"
import { DashboardApiKeyTable } from "@/components/app/dashboard-api-key-table"

import { getKeys } from "@/actions/key"
import { getAuthedUser } from "@/actions/session"

export function generateMetadata() {
  return {
    title: "API Keys",
    description:
      "Manage your API keys to access the API and integrate with your applications.",
  }
}

export default async function APIKeysPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const keys = (await getKeys(user.id)).filter((key) => !key.deletedAt)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">API Keys</h1>
        <DashboardApiKeyCreate user={user} length={keys.length} />
      </div>
      <DashboardApiKeyTable tokens={keys} />
    </>
  )
}
