import { Link } from "@navigation"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"

import { Blur } from "@/components/fancy/blur"
import { NumberTicker } from "@/components/fancy/number-ticker"
import { RetroGrid } from "@/components/fancy/retro-grid"
import { Icons } from "@/components/shared/icons"
import { BadgeShine } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

export async function MarketingHero() {
  const t = await getTranslations("app.components.app.marketing-hero")

  return (
    <div className="relative border-b border-b-[#ffffff1a] pb-10">
      <Blur />
      <RetroGrid className="opacity-20" />
      <div className="container relative ml-auto pt-20 md:pt-36">
        <div className="mx-auto text-center lg:w-[70%]">
          <Link href="/post/v-0-1-0">
            <BadgeShine>
              🎉 {t("badge-tagline")}
              <Icons.chevronRight className="size-4 pl-1" />
            </BadgeShine>
          </Link>

          <h1 className="pt-4 text-5xl font-bold text-zinc-900 md:text-6xl xl:text-7xl dark:text-white">
            <span className="gradient-text inline-block">
              {t("title")}{" "}
              <NumberTicker
                value={65}
                className="text-primary font-extrabold"
              />
              <span className="text-primary font-extrabold">%</span>
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-zinc-600 dark:text-zinc-300">
            {t("description")}
          </p>

          <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-3 sm:max-w-lg sm:flex-row md:mx-auto">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
              <Link
                href="/buy"
                className={cn(
                  buttonVariants({
                    variant: "default",
                    size: "lg",
                  }),
                  "gap-2 whitespace-pre md:flex",
                  "group relative w-full rounded-xl text-sm font-semibold tracking-tighter ring-offset-inherit transition-all duration-150 ease-in-out hover:ring-2 hover:ring-black hover:ring-offset-2 hover:ring-offset-current dark:hover:ring-neutral-50"
                )}
              >
                {t("buy")}
                <Icons.chevronRight className="ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
              </Link>
              <Link
                href="/post/story"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "gap-2 whitespace-pre md:flex",
                  "group relative w-full overflow-hidden rounded-xl text-sm font-semibold tracking-tighter transition-all duration-150 ease-in-out hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-inherit dark:hover:ring-black dark:hover:ring-offset-black "
                )}
              >
                {t("read")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
