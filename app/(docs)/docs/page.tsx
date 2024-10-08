import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

export const metadata: Metadata = constructMetadata({
  title: "Developers API Documentation",
  description: "API documentation for developers.",
})

export default function DocsPage() {
  return redirect(
    "https://findmalek.notion.site/Developers-API-Documentation-d6a9bb2ca09b4e9791d37268f7b30f73"
  )
}
