"use client"

import { Area, AreaChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 20 },
  { month: "Apr", value: 30 },
  { month: "May", value: 50 },
  { month: "Jun", value: 80 },
  { month: "Jul", value: 120 },
  { month: "Aug", value: 180 },
  { month: "Sep", value: 250 },
  { month: "Oct", value: 350 },
  { month: "Nov", value: 480 },
  { month: "Dec", value: 650 },
]

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function MarketingSolutionChart() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
