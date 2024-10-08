import React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

import { DashboardKeyUsage } from "@/components/app/dashboard-key-usage"
import { Icons } from "@/components/shared/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { getFunds } from "@/actions/funding"
import { getKeys } from "@/actions/key"
import { getChartData, getRequests } from "@/actions/request"
import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: "Overview",
  description:
    "View an overview of your account, including funds, API keys, and usage.",
})

export default async function DashboardPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const [keys, funds, requestsMonth] = await Promise.all([
    getKeys(user.id),
    getFunds(user.id),
    getRequests(
      user.id,
      new Date(Date.now() - 60 * 60 * 24 * 30 * 1000),
      new Date()
    ),
  ])

  const requestsWeek = requestsMonth.filter(
    (request) =>
      new Date(request.createdAt) >
      new Date(Date.now() - 60 * 60 * 24 * 7 * 1000)
  )

  const chartData = await getChartData(
    requestsMonth,
    new Date(Date.now() - 60 * 60 * 24 * 30 * 1000),
    new Date()
  )

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-2xl">Dashboard Overview</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Funds Available
            </CardTitle>
            <Icons.creditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {funds ? `€${funds.amount}` : "€0.00"}
            </div>
            <p className="text-xs text-muted-foreground">
              {funds ? "Available balance" : "No funds available"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              API Calls (24h)
            </CardTitle>
            <Icons.chart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                requestsWeek.filter(
                  (request) =>
                    request.createdAt >
                    new Date(Date.now() - 60 * 60 * 24 * 1000)
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              +{" "}
              {
                requestsWeek.filter(
                  (request) =>
                    request.createdAt > new Date(Date.now() - 60 * 60 * 1000)
                ).length
              }{" "}
              since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active API Keys
            </CardTitle>
            <Icons.key className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keys.filter((key) => !key.deletedAt).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {keys.filter((key) => key.deletedAt).length} keys expired or
              deleted
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <DashboardKeyUsage chartData={chartData} />
      </Card>
    </>
  )
}
