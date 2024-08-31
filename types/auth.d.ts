import { User } from "@prisma/client"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

export type MagicLinkData = {
  email: string
  otp_link: string
  passCode: string
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  type JWT = User
}

export type EmailSelectProps = {
  disabled?: boolean
  value: string
  onSelect: (value: string) => void
  options: EmalSelectOption[]
}

export type TokenType = {
  identifier: string
  token: string
  expires: string
  passCode: string
  verificationUrl: string
}
