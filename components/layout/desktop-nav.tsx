"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-4 text-sm lg:gap-6">
      <Link
        href="/docs"
        className={cn(
          "hover:text-foreground/80 transition-colors",
          pathname === "/docs" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Documentation
      </Link>
    </nav>
  )
}
