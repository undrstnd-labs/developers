import * as React from "react"
import Link from "next/link"
import { navMobileLinks, navUserLinks } from "@/data/navigations"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"
import { signOut } from "@/lib/auth"
import { cn } from "@/lib/utils"

import { ThemeSwitch } from "@/components/layout/theme-switch"
import { Icons } from "@/components/shared/icons"
import { UserMenuDropdown } from "@/components/shared/user-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav({ user }: { user: User | Boolean }) {
  async function handleSignOut() {
    "use server"
    await signOut()
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <Icons.menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="h-screen overflow-auto p-0 data-[state=closed]:duration-0 data-[state=open]:duration-0"
          side="top"
          close={false}
        >
          <div className="bg-background sticky top-0 z-50 p-4">
            <Link href="/" className="flex shrink-0 items-center">
              <Icons.logo className="h-8 w-auto" />
              <span className="text-secondary-foreground ml-2 mt-2 font-bold">
                {siteConfig.name}
              </span>
            </Link>
            <SheetClose className="absolute right-0 top-0 p-4">
              <Button variant="ghost" size="icon" aria-label="Close">
                <Icons.close className="size-6" />
              </Button>
            </SheetClose>
          </div>
          <div className="mt-8 flow-root px-2">
            {(user as User) ? (
              <div>
                <div className="space-y-3 pb-6">
                  <Link
                    href="/upgrade"
                    className={cn("w-full", buttonVariants())}
                  >
                    Inscription
                  </Link>
                  <Link
                    href="/support"
                    className={cn(
                      "w-full",
                      buttonVariants({ variant: "outline" })
                    )}
                  >
                    Support
                  </Link>
                </div>
                <UserMenuDropdown user={user as User} />
                {navUserLinks.map((item, index) => (
                  <Link
                    href={item.href}
                    key={index}
                    className="transition-color bg-background text-muted-foreground hover:bg-muted group flex min-w-full items-center justify-between rounded-md p-2 py-4 text-base font-semibold hover:no-underline"
                  >
                    <span className="text-muted-foreground group-hover:text-secondary-foreground group-hover:transition-all group-hover:duration-300">
                      {item.name}
                    </span>
                    <item.icon className="group-hover:text-primary size-5 group-hover:transition-all group-hover:duration-300" />
                  </Link>
                ))}
                <form action={handleSignOut}>
                  <Button
                    type="submit"
                    className="transition-color bg-background text-muted-foreground hover:bg-muted group flex min-w-full items-center justify-between rounded-md p-2 py-4 text-base font-semibold hover:no-underline"
                  >
                    <span className="text-muted-foreground group-hover:text-secondary-foreground group-hover:transition-all group-hover:duration-300">
                      Déconnexion
                    </span>
                    <Icons.lock className="group-hover:text-primary size-5 group-hover:transition-all group-hover:duration-300" />
                  </Button>
                </form>
                <Separator className="my-3" />
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/register"
                  className={cn("w-full", buttonVariants())}
                >
                  Inscription
                </Link>
                <Link
                  href="/login"
                  className={cn(
                    "w-full",
                    buttonVariants({ variant: "outline" })
                  )}
                >
                  Connexion
                </Link>
              </div>
            )}

            <Accordion type="single" collapsible className="w-full pt-4">
              {navMobileLinks
                .filter((item) => !item.href)
                .map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="-px-2 -mx-2 border-b-0"
                  >
                    <AccordionTrigger className="transition-color bg-background text-muted-foreground hover:bg-muted rounded-md px-4 text-base font-semibold hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.links
                        .filter((link) => !link.hide)
                        .map((link, linkIndex) => (
                          <Link
                            href={link.href}
                            key={linkIndex}
                            className="transition-color bg-background text-muted-foreground hover:bg-muted group flex min-w-full items-center justify-between space-x-2 rounded-md p-4 text-base font-semibold hover:no-underline"
                          >
                            <div className="flex items-center space-x-2">
                              <link.icon className="group-hover:text-primary size-5 group-hover:transition-all group-hover:duration-300" />
                              <span className="text-muted-foreground group-hover:text-secondary-foreground group-hover:transition-all group-hover:duration-300">
                                {link.name}
                              </span>
                            </div>
                            {link.active && (
                              <span className="relative flex size-2">
                                <span
                                  className={
                                    "bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-50"
                                  }
                                />
                                <span
                                  className={
                                    "bg-primary relative inline-flex size-2 rounded-full"
                                  }
                                />
                              </span>
                            )}
                          </Link>
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>

            <div>
              {navMobileLinks
                .filter((item) => item.href)
                .map((item, index) => (
                  <Link
                    href={item.href!}
                    key={index}
                    className="-px-2 transition-color bg-background text-muted-foreground hover:bg-muted -mx-2 flex flex-1  items-center justify-between rounded-md p-4 text-base font-semibold transition-all hover:no-underline"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>

            <div className="mt-3 flow-root space-y-6 px-2">
              <Separator className="my-5" />
              <div className="flex items-center justify-between">
                <span className="transition-color text-muted-foreground hover:text-secondary-foreground text-base font-semibold duration-300">
                  Theme
                </span>
                <ThemeSwitch />
              </div>
              <Separator className="my-5" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
