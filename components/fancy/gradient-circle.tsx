import React from "react"

import { cn } from "@/lib/utils"

export const SphereMask = ({ reverse = false }: { reverse?: boolean }) => {
  return (
    <div
      className={cn(
        "bg-primary/30",
        "pointer-events-none relative z-[-2] mx-auto h-[50rem] overflow-hidden",
        "[mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)]",
        reverse ? "my-[-18.8rem] rotate-180" : "my-[-18.8rem]",
        "before:absolute before:inset-0 before:size-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)]",
        "after:bg-background after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))]"
      )}
    />
  )
}

export function GradientCircle({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <SphereMask />
      {children}
      <SphereMask reverse />
    </div>
  )
}
