import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { notFoundMetadata } from "@/config/site"

export async function generateMetadata() {
  const t = await getTranslations("app.pages.not-found")

  return notFoundMetadata(t)
}

export default function CatchAllPage() {
  notFound()
}
