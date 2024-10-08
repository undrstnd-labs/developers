import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export function SiteNavigation() {
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <Link
        href="/login"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
        })}
      >
        Log in
      </Link>
      <Link
        href="/register"
        className={buttonVariants({
          size: "sm",
        })}
      >
        Register
      </Link>
    </div>
  )
}
