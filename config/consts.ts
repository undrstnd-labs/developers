import type { Email } from "@/types/mail"
import type { NavLink, Status } from "@/types"

export const locales = ["en", "fr"] as const
export const localePrefix = "as-needed"

export const emails = [
  {
    path: "email-preview/email-magic-link",
    name: "Magic Link",
    author: "findmalek",
    url: "https://emails.findmalek.com/preview/findplate/magic-link",
  },
  {
    path: "email-preview/email-whitelist",
    name: "Whitelist",
    author: "findmalek",
    url: "https://emails.findmalek.com/preview/findplate/whitelist",
  },
  {
    path: "email-preview/email-new-user",
    name: "New User",
    author: "findmalek",
    url: "https://emails.findmalek.com/preview/findplate/new-user",
  },
] satisfies Email[]

export const getNotFoundStatus = (t: (key: string) => string): Status[] => [
  {
    name: "<Status Code>",
    description: t("status-code"),
  },
  {
    name: "<Referrer Policy>",
    description: "strict-origin-when-cross-origin",
  },
  {
    name: "<Cache-Control>",
    description: "no-store, must-revalidate",
  },
  {
    name: "<Connection>",
    description: "keep-alive",
  },
  {
    name: "<Content-Type>",
    description: "text/html; charset=utf-8",
  },
  {
    name: "<Date>",
    description: new Date().toTimeString(),
  },
  {
    name: "<X-Powered-By>",
    description: "Next.js",
  },
  {
    name: "<Project-Name>",
    description: "FindPlate",
  },
  {
    name: "<Page>",
    description: t("page"),
  },
  {
    name: "<Are you lost?>",
    description: t("are-you-lost"),
  },
  {
    name: "<Contact>",
    description:
      t("reach-out") + ` ${location.origin}/talk-to-us ` + t("for-help"),
  },
]

export const navigationLinks: NavLink[] = [
  {
    name: "pricing",
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Updates",
    path: "/updates",
    name: "updates",
  },
  {
    title: "Story",
    path: "/post/story",
    name: "story",
  },
]
