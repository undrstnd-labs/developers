import { siteConfig } from "@/config/site"

import { Icons } from "@/components/shared/icons"

export function SiteFooter() {
  return (
    <footer className="p-5 lg:px-10">
      <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="header-logo flex items-center gap-x-2">
          <Icons.logo className="size-8 rounded-full" />
          <h2 className="text-base font-medium text-neutral-900 dark:text-white">
            {siteConfig.name}
          </h2>
        </div>
        <div className="flex items-center justify-center text-sm md:justify-start">
          <p className="mr-2  leading-loose text-muted-foreground">
            Brought by
          </p>
          {siteConfig.agency && (
            <a
              href={siteConfig.agency.url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:underline-offset-4"
            >
              {siteConfig.agency.name}
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
