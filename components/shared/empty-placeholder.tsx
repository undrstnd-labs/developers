import React from "react"

import { Icons } from "@/components/shared/icons"

interface EmptyPlaceholderProps {
  title: string
  overview: string
  children: React.ReactNode
}

export function EmptyPlaceholder({
  title,
  overview,
  children,
}: EmptyPlaceholderProps) {
  return (
    <div className="-mt-20 flex h-screen w-full items-center justify-center">
      <div className="duration-time relative block w-full max-w-md rounded-lg border-2 border-dashed border-secondary-foreground/20 p-12 text-center transition-all hover:border-secondary-foreground/50">
        <Icons.plus className="mx-auto size-24 text-secondary-foreground/60" />
        <span className="text-md mt-2 block font-semibold text-secondary-foreground">
          {title}
        </span>
        <p className="mt-2 block text-sm font-normal text-secondary-foreground/60">
          {overview}
        </p>
        <div className="py-6">{children}</div>
      </div>
    </div>
  )
}
