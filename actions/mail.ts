"use server"

import { render } from "@react-email/render"
import nodemailer from "nodemailer"

import { env } from "@/env.mjs"
import { MagicLinkData, MailOptions, MailType, NewUserData } from "@/types/mail"

import { siteConfig } from "@/config/site"

import { EmailMagicLink } from "@/components/app/email-magic-link"
import { EmailNewUser } from "@/components/app/email-new-user"

export async function sendMail(
  type: MailType,
  body: MagicLinkData | NewUserData
) {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: env.SMTP_SERVER,
    port: env.SMTP_PORT,
    auth: {
      user: env.FROM_EMAIL_GMAIL,
      pass: env.FROM_EMAIL_PASSWORD,
    },
  })

  let mailOptions: MailOptions | undefined
  switch (type) {
    case "magic-link": {
      const html = render(EmailMagicLink({ magicLink: body as MagicLinkData }))
      mailOptions = {
        from: `${siteConfig.name} <${env.FROM_EMAIL}>`,
        to: (body as MagicLinkData).email,
        subject: `Votre Magic Link et OTP code ${siteConfig.name}`,
        html,
      }
      break
    }
    case "new-user": {
      const html = render(
        EmailNewUser({ username: (body as NewUserData).username })
      )
      mailOptions = {
        from: `${siteConfig.name} <${env.FROM_EMAIL}>`,
        to: (body as NewUserData).email,
        subject: `Bienvenu to ${siteConfig.name}`,
        html,
      }
      break
    }
  }

  try {
    if (!mailOptions) throw new Error("Mail options not set")
    await mailTransporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.log("Error sending email:", error)
    return false
  }
}
