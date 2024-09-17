import React from "react"
import Image from "next/image"
import Link from "next/link"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"

import { DesktopNav } from "@/components/layout/desktop-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SiteNavigation } from "@/components/layout/site-navigation"
import { Icons } from "@/components/shared/icons"
import { UserMenu } from "@/components/shared/user-menu"
import { Button, buttonVariants } from "@/components/ui/button"

export function SiteHeader({ user }: { user: User | Boolean }) {
  return (
    <header className="border-b-3 border-secondary-foreground/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/" className="relative flex px-2 lg:px-0">
            <div className="flex shrink-0 items-center">
              <Icons.logo className="h-8 w-auto" />
              <span className="text-secondary-foreground ml-2 font-bold">
                {siteConfig.name}
              </span>
            </div>
          </Link>
          <DesktopNav />
        </div>
        <MobileNav user={user} />
        <div className="hidden lg:block">
          {user ? (
            <Link
              href="/dashboard"
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              Dashboard
            </Link>
          ) : (
            <SiteNavigation />
          )}
        </div>
      </div>
    </header>
  )
}
