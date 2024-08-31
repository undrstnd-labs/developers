import { getStatus } from "@openstatus/react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

export async function StatusWidget() {
  const t = useTranslations("app.components.ui.status-widget")
  const res = await getStatus("findplate")

  const { status } = res

  const getStatusLevel = (level: string) => {
    return {
      operational: {
        label: t("operational"),
        color: "bg-green-500",
        color2: "bg-green-400",
      },
      degraded_performance: {
        label: t("degraded-performance"),
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      partial_outage: {
        label: t("partial-outage"),
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      major_outage: {
        label: t("major-outage"),
        color: "bg-red-500",
        color2: "bg-red-400",
      },
      unknown: {
        label: t("unknown"),
        color: "bg-gray-500",
        color2: "bg-gray-400",
      },
      incident: {
        label: t("incident"),
        color: "bg-yellow-500",
        color2: "bg-yellow-400",
      },
      under_maintenance: {
        label: t("under-maintenance"),
        color: "bg-gray-500",
        color2: "bg-gray-400",
      },
    }[level]
  }

  const level = getStatusLevel(status)!

  return (
    <a
      className="border-border flex w-full items-center justify-between space-x-2 rounded-md border px-3 py-1"
      href="https://findplate.openstatus.dev"
      target="_blank"
      rel="noreferrer"
    >
      <div>
        <p className="text-sm">{level.label}</p>
      </div>

      <span className="relative ml-auto flex size-1.5">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-75",
            level.color2
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            level.color
          )}
        />
      </span>
    </a>
  )
}
