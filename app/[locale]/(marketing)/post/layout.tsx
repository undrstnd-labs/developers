import React from "react"
import { unstable_setRequestLocale } from "next-intl/server"

interface PostLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function PostLayout({
  children,
  params: { locale },
}: PostLayoutProps) {
  unstable_setRequestLocale(locale)

  return <>{children}</>
}
