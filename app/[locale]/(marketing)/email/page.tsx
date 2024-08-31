import React from "react"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { siteConfig } from "@/config/site"

import {
  TypographyAnchor,
  TypographyH1,
  TypographyLead,
} from "@/components/shared/typography"

// TODO: Generate /opengraph/emails.png
export async function generateMetadata() {
  const t = await getTranslations("app.pages.email")

  return {
    title: `${siteConfig.name} | ${t("title")}`,
    description: t("description"),
    openGraph: {
      title: `${siteConfig.name} | ${t("title")}`,
      description: t("description"),
      images: [
        {
          url: siteConfig.images.default,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${t("title")}`,
      description: siteConfig.description,
      images: [siteConfig.images.default],
      creator: "@findmalek",
    },
  }
}
export default async function EmailsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("app.pages.email")

  return (
    <main>
      <div className="h-screen-ios relative z-20 mx-auto flex max-w-7xl flex-col px-4">
        <div className="relative mx-auto flex max-w-3xl flex-col justify-center py-10">
          <div className="mb-12 max-w-[745px] text-center">
            <TypographyH1 text="Examples" />

            <TypographyLead>
              {t("lead.p-1")}
              <br />
              {t("lead.p-2")}
              <TypographyAnchor
                href="https://github.com/resend/react-email/issues?q=is%3Aissue+is%3Aopen+label%3A%22app%3A+demo%22"
                target="_blank"
              >
                {t("lead.p-3")}
              </TypographyAnchor>
              {t("lead.p-4")}
              <TypographyAnchor
                href="https://github.com/resend/react-email/tree/main/demo"
                target="_blank"
              >
                {t("lead.p-5")}
              </TypographyAnchor>{" "}
              {t("lead.p-6")}
            </TypographyLead>
          </div>

          {/*    <div className="grid grid-cols-2 gap-8">
            {items.map((item) => (
              <Example key={item.path} {...item} />
            ))}
          </div> */}
        </div>
      </div>
    </main>
  )
}
