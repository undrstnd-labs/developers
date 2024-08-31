import React from "react"
import { Link } from "@navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { MainNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { buttonVariants } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {siteConfig.links.twitter && (
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "size-8 px-0"
                  )}
                >
                  <Icons.twitter className="size-3 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
            )}
            {siteConfig.links.discord && (
              <Link
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "size-8 px-0"
                  )}
                >
                  <Icons.discord className="size-4" />
                  <span className="sr-only">Discord</span>
                </div>
              </Link>
            )}
            {siteConfig.links.github && (
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                    }),
                    "size-8 px-0"
                  )}
                >
                  <Icons.github className="size-4" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
            )}

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
