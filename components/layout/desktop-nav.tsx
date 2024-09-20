"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-4 text-sm lg:flex lg:gap-6">
      <Link
        href="https://docs.undrstnd-labs.com/"
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === "/docs" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Documentation
      </Link>
    </nav>
  )
}
