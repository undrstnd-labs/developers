import React from "react"
import Link from "next/link"

import { news } from "@/config/site"
import { cn } from "@/lib/utils"

import { MarketingHeroInstall } from "@/components/app/marketing-hero-install"
import { MarketingVideo } from "@/components/app/marketing-video"
import { AnimatedBadge } from "@/components/fancy/animated-badge"
import { FramerComponentWrapper } from "@/components/layout/framer-wrapper"
import { Icons } from "@/components/shared/icons"
import { Button, buttonVariants } from "@/components/ui/button"

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

            <div className="relative flex flex-col items-center gap-4">
              <FramerComponentWrapper
                className={cn(
                  "relative mx-0 max-w-full pt-5 md:mx-auto md:px-4 md:py-2",
                  "text-balance font-bold tracking-tighter",
                  "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                )}
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  staggerChildren: 0.2,
                }}
              >
                Build Your High Performance, Easy, and Fast AI-Powered Project
              </FramerComponentWrapper>
              <FramerComponentWrapper
                className="max-w-6xl text-balance text-center text-base tracking-tight text-muted-foreground md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                }}
              >
                Scale your applications efficiently with our easy-to-use AI
                inference. Our Large Language Models (LLMs) are{" "}
                <b>lightning-fast</b> and consume{" "}
                <b>significantly less energy</b>, providing you with unbeatable
                performance and sustainability.
              </FramerComponentWrapper>
            </div>

            <FramerComponentWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mx-auto flex w-full max-w-full flex-col items-center justify-center gap-4 py-1 sm:max-w-xl sm:flex-row md:mx-auto"
            >
              <Link href="/#cta">
                <Button
                  variant="expandIcon"
                  Icon={Icons.chevronRight}
                  iconPlacement="right"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Join our waitlist
                </Button>
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
            </FramerComponentWrapper>
            <MarketingHeroInstall />
          </div>
        </div>
      </div>

      <MarketingVideo />
      <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4" />
    </section>
  )
}
