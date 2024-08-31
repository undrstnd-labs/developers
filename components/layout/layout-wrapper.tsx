import { NextIntlClientProvider, useMessages } from "next-intl"

import { ThemeProvider } from "@/components/layout/theme-provider"

export function LayoutWrapper({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: string
}) {
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
