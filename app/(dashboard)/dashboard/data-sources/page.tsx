import React from "react"
import { redirect } from "next/navigation"

import { DashboardDataSourcesCards } from "@/components/app/dashboard-data-sources-cards"
import { Button } from "@/components/ui/button"

import { getAuthedUser } from "@/actions/session"

export function generateMetadata() {
  return {
    title: "Data Sources",
    description:
      "Manage your data sources to access the API and integrate with your RAG applications.",
  }
}

export default async function DataSourcesPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">Data Sources</h1>
        <Button>Add Data Source</Button>
      </div>
      <DashboardDataSourcesCards />
    </>
  )
}
