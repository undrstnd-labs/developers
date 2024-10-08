"use server"

import { render } from "@react-email/render"
import nodemailer from "nodemailer"

import { env } from "@/env.mjs"
import {
  MagicLinkData,
  MailOptions,
  MailType,
  NewUserData,
  WaitlistData,
} from "@/types/mail"

import { siteConfig } from "@/config/site"

import { EmailMagicLink } from "@/components/app/email-magic-link"
import { EmailNewUser } from "@/components/app/email-new-user"
import { EmailWhitelist } from "@/components/app/email-whitelist"

/**
 * This function sends an email to a user.
 *
 * @param type - The type of email to send.
 * @param body - The data to include in the email.
 *
 * @returns A promise that resolves to true if the email was sent successfully, or false if there was an error.
 *
 * ### Explanation:
 * - The function takes two parameters: `type` (a `MailType` enum) and `body` (a `MagicLinkData` or `NewUserData` object).
 * - It creates a nodemailer transporter using the SMTP server and credentials from the environment variables.
 * - It generates the HTML content for the email based on the email type and data.
 * - It sends the email using the nodemailer transporter.
 * - It returns true if the email was sent successfully, or false if there was an error.
 *
 * ### Types:
 * - `type`: A `MailType` enum representing the type of email to send.
 * - `body`: A `MagicLinkData` or `NewUserData` object containing the data to include in the email.
 * - The function returns a promise that resolves to a boolean value.
 */
export async function sendMail(
  type: MailType,
  body: MagicLinkData | NewUserData | WaitlistData
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
        subject: `Your Magic Link and OTP code ${siteConfig.name}`,
        html,
      }
      break
    }
    case "new-user": {
      const html = render(EmailNewUser({ name: (body as NewUserData).name }))
      mailOptions = {
        from: `${siteConfig.name} <${env.FROM_EMAIL}>`,
        to: (body as NewUserData).email,
        subject: `Welcome to ${siteConfig.name}`,
        html,
      }
      break
    }
    case "whitelist": {
      const html = render(EmailWhitelist())
      mailOptions = {
        from: `${siteConfig.name} <${env.FROM_EMAIL}>`,
        to: (body as WaitlistData).email,
        subject: `Welcome to ${siteConfig.name}`,
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
