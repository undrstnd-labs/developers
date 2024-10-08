import React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

import { DashboardDataSourcesAdd } from "@/components/app/dashboard-data-sources-add"
import { DashboardDataSourcesCards } from "@/components/app/dashboard-data-sources-cards"
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder"

import { getResources } from "@/actions/resource"
import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: "Data Sources",
  description:
    "Manage your data sources to access the API and integrate with your RAG applications.",
})

export default async function DataSourcesPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const resources = await getResources(user.id)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">Data Sources</h1>
        <DashboardDataSourcesAdd user={user} />
      </div>

      {resources.filter((resource) => !resource.deletedAt).length === 0 ? (
        <EmptyPlaceholder
          title="Create your first data source"
          overview="Data sources are used to access the API and integrate with your RAG applications. Create your first data source to get started."
        >
          <DashboardDataSourcesAdd user={user} />
        </EmptyPlaceholder>
      ) : (
        <DashboardDataSourcesCards resources={resources} />
      )}
    </>
  )
}
