import React from "react"
import { BarChart3, CreditCard, Key } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Dashboard Overview
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Funds Available
            </CardTitle>
            <CreditCard className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-muted-foreground text-xs">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              API Calls (24h)
            </CardTitle>
            <BarChart3 className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573,234</div>
            <p className="text-muted-foreground text-xs">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active API Keys
            </CardTitle>
            <Key className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-muted-foreground text-xs">
              2 keys expiring soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Funds Consumed
            </CardTitle>
            <CreditCard className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <Progress value={68.2} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>API Key Usage</CardTitle>
          <CardDescription>
            Number of API calls per key in the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            {/* Replace this div with an actual chart component */}
            <div className="text-muted-foreground flex h-full items-center justify-center">
              Chart placeholder: API calls per key
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
