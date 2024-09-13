import Image from "next/image"
import Link from "next/link"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"

import {
  DashboardSiteNavigation,
  DashboardSiteNavigationMobile,
} from "@/components/layout/dashboard-site-navigation"
import { Icons } from "@/components/shared/icons"
import { UserMenu } from "@/components/shared/user-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { getAuthedUser } from "@/actions/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthedUser()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Icons.logo className="size-6" />
              <span>{siteConfig.name}</span>
            </Link>
          </div>
          <div className="flex-1">
            <DashboardSiteNavigation />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Icons.menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <DashboardSiteNavigationMobile />
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center">
            <UserMenu user={user as User}>
              <Button variant="secondary" size="icon" className="rounded-full">
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
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
