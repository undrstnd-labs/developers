import React from "react"
import Link from "next/link"

import { AnimatedBadgeProps } from "types"

import { cn } from "@/lib/utils"

import { GradientText } from "@/components/fancy/gradient-text"
import { Icons } from "@/components/shared/icons"
import { Separator } from "@/components/ui/separator"

export function AnimatedBadge({ title, href }: AnimatedBadgeProps) {
  return (
    <Link href={href}>
      <GradientText>
        <div
          className={cn(
            `animate-gradient absolute inset-0 block size-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:var(--bg-size)_100%] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`,
            `p-px ![mask-composite:subtract]`
          )}
        />
        ⚡ <Separator className="mx-2 h-4" orientation="vertical" />
        <span
          className={cn(
            `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            `inline`
          )}
        >
          {title}
        </span>
        <Icons.chevronRight className="ml-1 size-4 text-gray-500" />
      </GradientText>
    </Link>
  )
}
