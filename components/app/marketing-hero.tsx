import React from "react"
import Link from "next/link"

import { news } from "@/config/site"
import { cn } from "@/lib/utils"

import { MarketingHeroInstall } from "@/components/app/marketing-hero-install"
import { AnimatedBadge } from "@/components/fancy/animated-badge"
import { buttonVariants } from "@/components/ui/button"

export function MarketingHero() {
  return (
    <section
      id="hero"
      className="relative h-full overflow-hidden py-5 md:py-14"
    >
      <svg
        className="absolute inset-0 -z-10 size-full stroke-muted-foreground/20"
        aria-hidden="true"
      >
        <defs>
          <mask id="fadeMask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#fadeGradient)"
            />
          </mask>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgba(255, 255, 255, 1)", stopOpacity: 8 }}
            />
            <stop
              offset="10%"
              style={{
                stopColor: "rgba(255, 255, 255, 0.8)",
                stopOpacity: 0.8,
              }}
            />
            <stop
              offset="90%"
              style={{
                stopColor: "rgba(255, 255, 255, 0.8)",
                stopOpacity: 0.8,
              }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgba(255, 255, 255, 0)", stopOpacity: 0 }}
            />
          </linearGradient>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          mask="url(#fadeMask)"
        />
      </svg>

      <div className="z-10 flex flex-col">
        <div className="mt-10 grid grid-cols-1 md:mt-20">
          <div className="flex flex-col items-center gap-6 px-4 pb-8 text-center md:px-10">
            <AnimatedBadge href={news.url} title={news.overview} />
            <div className="relative flex flex-col items-center gap-4 lg:flex-row">
              <h1
                className={cn(
                  "relative mx-0 max-w-7xl pt-5 md:mx-auto md:px-4 md:py-2",
                  "text-balance font-bold tracking-tighter",
                  "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                )}
              >
                Build Your High Performance, Easy, and Fast AI-Powered Project
              </h1>
            </div>

            <p className="max-w-6xl text-balance text-center text-base tracking-tight text-muted-foreground md:text-lg">
              Scale your applications efficiently with our easy-to-use AI
              inference. Our Large Language Models (LLMs) are{" "}
              <b>lightning-fast</b> and consume <b>significantly less energy</b>
              , providing you with unbeatable performance and sustainability.
            </p>

            <div className="mx-auto flex w-full max-w-full flex-col items-center justify-center gap-4 py-1 sm:max-w-xl sm:flex-row md:mx-auto">
              <Link
                href="/#cta"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                  "w-full sm:w-auto"
                )}
              >
                Join our waitlist
              </Link>
              <Link
                href="/docs"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "w-full sm:w-auto"
                )}
              >
                Learn Undrstnd
              </Link>
            </div>
            <MarketingHeroInstall />
          </div>
        </div>
      </div>
    </section>
  )
}
