import React from "react"

import { MarketingCallToAction } from "@/components/app/marketing-call-to-action"
import { MarketingChat } from "@/components/app/marketing-chat"
import { MarketingHero } from "@/components/app/marketing-hero"

export default async function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingChat />
      <MarketingCallToAction />
    </>
  )
}
