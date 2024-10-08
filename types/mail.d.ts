export type MailType = "magic-link" | "whitelist" | "new-user"

export type MagicLinkData = {
  email: string
  otp_link: string
  passCode: string
}

export type WaitlistData = {
  email: string
}

export type MailOptions = {
  from: string
  to: string
  subject: string
  html: string
}

export type NewUserData = {
  email: string
  name: string
}

export type Email = {
  path: string
  name: string
  author: string
  url: string
}
