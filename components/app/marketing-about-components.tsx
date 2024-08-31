"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

import { Confetti, type ConfettiRef } from "@/components/fancy/confetti"

export function MarketingAboutComponents({
  className,
}: {
  className?: string
}) {
  const confettiRef = useRef<ConfettiRef>(null)

  return (
    <div
      className={cn(
        "bg-background relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl",
        className
      )}
    >
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-extrabold leading-none text-transparent dark:from-white dark:to-slate-900/40">
        100 +
      </span>

      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({})
        }}
      />
    </div>
  )
}
