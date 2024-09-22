import type { Email } from "@/types/mail"

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

export enum EndpointType {
  PREDICT,
  RAG,
}
