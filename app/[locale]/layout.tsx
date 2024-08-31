import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { LogSnagProvider } from "@logsnag/next"
import { unstable_setRequestLocale } from "next-intl/server"

import { env } from "@/env.mjs"

import { locales } from "@/config/consts"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Analytics } from "@/components/layout/analytics"
import { LayoutWrapper } from "@/components/layout/layout-wrapper"
import { TailwindIndicator } from "@/components/layout/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "findmalek",
      url: "https://www.findmalek.com",
    },
  ],
  creator: "findmalek",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.images.default, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.images.default],
    creator: "@findmalek",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  metadataBase: new URL(siteConfig.url),
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <LogSnagProvider
          token={env.LOGSNOG_API_TOKEN}
          project={env.LOGSNOG_PROJECT_NAME}
        />
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <LayoutWrapper locale={locale}>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </LayoutWrapper>
      </body>
    </html>
  )
}
