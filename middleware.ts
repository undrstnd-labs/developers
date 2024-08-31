import createMiddleware from "next-intl/middleware"

import { locales } from "@/config/consts"

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
})

// TODO: Always add the new locales in the matcher & config
export const config = {
  matcher: [
    "/",
    `/(fr|en|ar|tn|de|it)/:path*`,
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
