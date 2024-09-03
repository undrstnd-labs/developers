import React from "react"
import Link from "next/link"

import { news } from "@/config/site"
import { cn } from "@/lib/utils"

import { AnimatedBadge } from "@/components/fancy/animated-badge"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"

export function MarketingHero() {
  return (
    <section
      id="hero"
      className="relative h-full overflow-hidden py-5 md:py-14"
    >
      <div className="z-10 flex flex-col">
        <div className="mt-10 grid grid-cols-1 md:mt-20">
          <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
            <AnimatedBadge href={news.url} title={news.overview} />
            <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
              <h1
                className={cn(
                  "text-black dark:text-white",
                  "relative mx-0 max-w-[43.5rem]  pt-5  md:mx-auto md:px-4 md:py-2",
                  "text-balance text-left font-semibold tracking-tighter md:text-center",
                  "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                )}
              >
                Fusion UI library Shadcn/ui + MagicUI
              </h1>
            </div>

            <p className="max-w-xl text-balance text-left text-base tracking-tight text-black md:text-center md:text-lg dark:font-medium dark:text-white ">
              150+ free and open-source UI elements built with <b>React</b>,
              <b>Typescript</b>,<b>Tailwind CSS</b>, and <b>Framer Motion</b>
              .
              <br />
              Perfect companion for.
            </p>

            <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                <Link
                  href="/components"
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "lg",
                    }),
                    "gap-2 whitespace-pre md:flex",
                    "group relative w-full rounded-xl text-sm font-semibold tracking-tighter ring-offset-inherit transition-all duration-150 ease-in-out hover:ring-2 hover:ring-black hover:ring-offset-2 hover:ring-offset-current dark:hover:ring-neutral-50"
                  )}
                >
                  Browse Components
                  <Icons.chevronRight className="ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/docs"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: "outline",
                    }),
                    "gap-2 whitespace-pre md:flex",
                    "group relative w-full overflow-hidden rounded-xl text-sm font-semibold tracking-tighter transition-all duration-150 ease-in-out hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-inherit dark:hover:ring-black dark:hover:ring-offset-black "
                  )}
                >
                  Get Started
                  <Icons.chevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
