import React from "react"

import { MarketingChat } from "@/components/app/marketing-chat"
import { MarketingHero } from "@/components/app/marketing-hero"

export default async function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingChat />
    </>
  )
}
