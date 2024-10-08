import React from "react"

import { HeroVideoDialog } from "@/components/fancy/hero-video-dialog"
import { FramerComponentWrapper } from "@/components/layout/framer-wrapper"

export function MarketingVideo() {
  return (
    <FramerComponentWrapper
      className="relative mx-auto flex w-full items-center justify-center pb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/watch?v=KQrSe4ZFpUU"
        thumbnailSrc="/marketing/video-preview.png"
        thumbnailAlt="Hero Video"
        className="max-w-screen-lg rounded-lg border shadow-lg"
      />
    </FramerComponentWrapper>
  )
}
