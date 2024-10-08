import React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

import { DashboardApiKeyCreate } from "@/components/app/dashboard-api-key-create"
import { DashboardApiKeyTable } from "@/components/app/dashboard-api-key-table"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { getKeys } from "@/actions/key"
import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: "API Keys",
  description:
    "Manage your API keys to access the API and integrate with your applications.",
})

export default async function APIKeysPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const keys = await getKeys(user.id)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">API Keys</h1>
        <DashboardApiKeyCreate
          user={user}
          length={keys.filter((key) => !key.deletedAt).length}
        />
      </div>
      {keys.filter((key) => !key.deletedAt).length === 0 ? (
        <EmptyPlaceholder
          title="Create your first API key"
          overview="API keys are used to authenticate and access the API. Create your first key to get started."
        >
          <DashboardApiKeyCreate user={user} length={0} />
        </EmptyPlaceholder>
      ) : (
        <DashboardApiKeyTable tokens={keys.filter((key) => !key.deletedAt)} />
      )}
    </>
  )
}
