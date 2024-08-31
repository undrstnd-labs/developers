import { cn } from "@/lib/utils"

import { CircularProgressBar } from "@/components/fancy/circular-progress-bar"
import { Meteors } from "@/components/fancy/meteors"

export function MarketingAboutSeo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl",
        className
      )}
    >
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        <CircularProgressBar
          max={100}
          min={0}
          value={95}
          gaugePrimaryColor="rgb(76, 175, 80)"
          gaugeSecondaryColor="rgba(204, 236, 204, 0.1)"
        />
      </span>
    </div>
  )
}
