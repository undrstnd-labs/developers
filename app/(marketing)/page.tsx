import React from "react"

import { MarketingCallToAction } from "@/components/app/marketing-call-to-action"
import { MarketingChat } from "@/components/app/marketing-chat"
import { MarketingFAQs } from "@/components/app/marketing-faqs"
import { MarketingHero } from "@/components/app/marketing-hero"
import { MarketingProblem } from "@/components/app/marketing-problem"
import { MarketingSocialProof } from "@/components/app/marketing-social-proof"
import { MarketingSolution } from "@/components/app/marketing-solution"
import { MarketingStoryTelling } from "@/components/app/marketing-story-telling"
import { MarketingTestimonial } from "@/components/app/marketing-testimonial"

export default async function MarketingPage() {
  return (
    <>
      <MarketingHero />
      <MarketingSocialProof />
      <MarketingProblem />
      <MarketingSolution />
      <MarketingChat />
      <MarketingStoryTelling />
      <MarketingTestimonial />
      <MarketingCallToAction />
      <MarketingFAQs />
    </>
  )
}
