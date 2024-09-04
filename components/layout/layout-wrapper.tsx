import React from "react"

import { FramerWrapper } from "@/components/layout/framer-wrapper"
import { ThemeProvider } from "@/components/layout/theme-provider"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FramerWrapper>{children}</FramerWrapper>
    </ThemeProvider>
  )
}
