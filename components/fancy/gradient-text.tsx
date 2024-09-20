import React from "react"

import { cn } from "@/lib/utils"

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-muted-foreground/5 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-black/40",
        className
      )}
    >
      <div className="animate-gradient absolute inset-0 block size-full bg-gradient-to-r from-sky-400/50 via-teal-500/50 to-sky-600/50 bg-[length:var(--bg-size)_100%] p-px [border-radius:inherit] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />

      {children}
    </div>
  )
}
