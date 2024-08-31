import { unstable_setRequestLocale } from "next-intl/server"

import { locales } from "@/config/consts"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale)

  return (
    <main>
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  )
}
