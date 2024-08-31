import { cn } from "@/lib/utils"

export function BlurryCircle({ className }) {
  return (
    <div
      className={cn(
        "pointer-events-none size-[216px] rounded-full blur-2xl",
        className
      )}
    />
  )
}
