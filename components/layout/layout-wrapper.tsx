import React from "react"

import { FramerWrapper } from "@/components/layout/framer-wrapper"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <FramerWrapper>
        <TooltipProvider>{children}</TooltipProvider>
      </FramerWrapper>
    </ThemeProvider>
  )
}
