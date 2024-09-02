import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import EmailProvider from "next-auth/providers/email"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"

import { env } from "@/env.mjs"

import { db } from "@/lib/prisma"

import { sendMail } from "@/actions/mail"
import { updateVerificationToken } from "@/actions/token"
import { isBanned } from "@/actions/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    EmailProvider({
      from: env.FROM_EMAIL,
      server: {
        host: env.SMTP_SERVER,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.FROM_EMAIL_GMAIL,
          pass: env.FROM_EMAIL_PASSWORD,
        },
      },
      maxAge: 60 * 60 + 5 * 60,
      sendVerificationRequest: async ({ identifier, url }) => {
        if (await isBanned(identifier)) {
          return
        }

        const passCode = await updateVerificationToken({
          params: {
            email: identifier,
            url,
          },
        })

        await sendMail("magic-link", {
          email: identifier,
          otp_link: url,
          passCode: passCode as string,
        })
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: session.user.email,
        },
      })

      if (token && dbUser) {
        session.user.id = dbUser.id
        session.user.username = dbUser.username
        session.user.verified = dbUser.verified
        session.user.email = dbUser.email
        session.user.image = dbUser.image
        session.user.deletedAt = dbUser.deletedAt
      }

      return session
    },
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        const dbUser = await db.user.findFirst({
          where: {
            email: user.email as string,
          },
        })

        if (dbUser) {
          return {
            id: dbUser.id,

            username: dbUser.username,
            image: dbUser.image,
            email: dbUser.email,
            phone: dbUser.phone,

            verified: dbUser.verified,
            emailVerified: dbUser.emailVerified,

            deletedAt: dbUser.deletedAt,
            createdAt: dbUser.createdAt,
            updatedAt: dbUser.updatedAt,
          }
        }

        token.id = user?.id
      }

      return token
    },
  },
})
