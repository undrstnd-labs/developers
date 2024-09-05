import React from "react"
import Image from "next/image"
import Link from "next/link"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"

import { MobileNav } from "@/components/layout/mobile-nav"
import {
  SiteAuthentification,
  SiteNavigation,
} from "@/components/layout/site-navigation"
import { Icons } from "@/components/shared/icons"
import { UserMenu } from "@/components/shared/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteHeader({ user }: { user: User | Boolean }) {
  return (
    <header className="border-b-3 border-secondary-foreground/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="relative flex px-2 lg:px-0">
          <div className="flex shrink-0 items-center">
            <Icons.logo className="h-8 w-auto" />
            <span className="text-secondary-foreground ml-2 mt-2 font-bold">
              {siteConfig.name}
            </span>
          </div>
        </Link>

        {/* <div className="hidden w-full sm:max-w-xs lg:block">
          <div className="relative">
            <Icons.search className="text-muted-foreground absolute left-2 top-2.5 size-4" />
            <Input
              type="search"
              placeholder="Recherche..."
              className="w-full pl-8 lg:w-[400px]"
            />
          </div>
        </div> */}

        <MobileNav user={user} />

        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="small-icon"
                className="mr-4"
                aria-label="Notifications"
              >
                <Icons.bell className="text-muted-foreground size-6" />
              </Button>
              <UserMenu user={user as User}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Image
                    src={(user as User).image}
                    alt={(user as User).username!}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </Button>
              </UserMenu>
            </div>
          ) : (
            <SiteAuthentification />
          )}
        </div>
      </div>
    </header>
  )
}
