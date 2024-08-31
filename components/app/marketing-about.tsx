import React from "react"
import { features } from "@/data/features"
import { getTranslations } from "next-intl/server"

import { siteConfig } from "@/config/site"

import { BentoCard, BentoGrid } from "@/components/fancy/bento-grid"
import { GradientCircle } from "@/components/fancy/gradient-circle"

export async function MarketingAbout() {
  const t = await getTranslations("app.components.app.marketing-about")
  return (
    <GradientCircle>
      <h2 className="container mb-8 text-center text-xl font-normal">
        <span className="text-4xl font-semibold">{siteConfig.name}? </span>
        <br className="block lg:hidden" />
        {t("overview")}
      </h2>
      <BentoGrid className="container">
        {features(t).map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </GradientCircle>
  )
}
