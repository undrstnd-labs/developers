import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

import { locales } from "@/config/consts"

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`@/locale/${locale}.json`)).default,
  }
})
