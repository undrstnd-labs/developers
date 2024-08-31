"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"

import { AnimatedBeam } from "@/components/fancy/animated-beam"
import { Icons } from "@/components/shared/icons"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function MarketingAboutAuth({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)

  return (
    <div className={cn(className)} ref={containerRef}>
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div1Ref}>
            <Icons.lock className="text-secondary-foreground size-12" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div2Ref} className="size-16">
            <Icons.logoLucide className="text-secondary-foreground group-hover:text-primary size-12" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div3Ref}>
            <Icons.user className="text-secondary-foreground size-12" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div2Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div2Ref}
      />
    </div>
  )
}
