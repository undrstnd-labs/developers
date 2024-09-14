"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navDashboardLinks } from "@/data/navigations"

import { cn } from "@/lib/utils"

export function DashboardSiteNavigation() {
  const pathname = usePathname()

  const mainLinks = navDashboardLinks.filter((link) => link.name !== "Support")
  const supportLink = navDashboardLinks.find((link) => link.name === "Support")

  return (
    <nav className="flex h-full flex-col px-2 text-sm font-medium lg:px-4">
      <div className="grow">
        {mainLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              pathname === link.href
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            )}
          >
            <link.icon className="size-4" />
            {link.name}
          </Link>
        ))}
      </div>
      {supportLink && (
        <Link
          key={supportLink.name}
          href={supportLink.href}
          className={cn(
            "text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            pathname === supportLink.href
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          )}
        >
          <supportLink.icon className="size-4" />
          {supportLink.name}
        </Link>
      )}
    </nav>
  )
}

export function DashboardSiteNavigationMobile() {
  const pathname = usePathname()

  return (
    <nav className="mt-8 grid gap-2 text-lg font-medium">
      {navDashboardLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-lg",
            pathname === link.href
              ? "bg-muted/40 text-primary font-semibold"
              : "text-muted-foreground"
          )}
        >
          <link.icon className="size-6" />
          <span>{link.name}</span>
        </Link>
      ))}
    </nav>
  )
}
