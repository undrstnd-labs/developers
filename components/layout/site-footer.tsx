import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { siteConfig } from "@/config/site"

import { Icons } from "@/components/shared/icons"

export async function SiteFooter() {
  const t = await getTranslations("app.components.layout.site-footer")
  return (
    <footer className="p-5 lg:px-10">
      <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="header-logo flex items-center gap-x-2">
          <Icons.logo className="size-8 rounded-full" />
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            {siteConfig.name}
          </h2>
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <p className="text-muted-foreground mr-2 text-sm leading-loose">
            {t("follow")}
          </p>
          {siteConfig.author.github && (
            <Image
              src={`${siteConfig.author.github}.png`}
              alt={siteConfig.author.name}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
          )}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.author.name}
          </a>
          <p className="ml-1">.</p>
        </div>
      </div>
    </footer>
  )
}
