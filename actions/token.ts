"use server"

import * as z from "zod"

import { authOTPCodeSchema } from "@/config/validation"
import { db } from "@/lib/prisma"

const routeContextSchema = z.object({
  params: z.object({
    email: z.string().email(),
    url: z.string().url(),
  }),
})

/**
 * This function updates the verification token.
 *
 * @param context - The context object containing the email and url.
 *
 * @returns The updated verification token.
 *
 * ### Explanation:
 * - The function takes the following parameter: `context`.
 * - It updates the verification token with a new pass code and verification URL.
 * - It returns the updated verification token.
 *
 * ### Types:
 * - `context` is the context object containing the email and url.
 * - The function returns the updated verification token.
 */
export async function updateVerificationToken(
  context: z.infer<typeof routeContextSchema>
) {
  const { email, url } = routeContextSchema.parse(context).params

  const verificationTokens = await db.verificationToken.findMany({
    where: {
      identifier: email.toLowerCase(),
    },
    orderBy: {
      expires: "desc",
    },
  })

  const verificationToken = verificationTokens[0]

  if (!verificationToken) {
    return new Response(null, { status: 404 })
  }

  const passCode = Math.floor(100000 + Math.random() * 900000).toString()

  const verifiedToken = await db.verificationToken.update({
    where: {
      token: verificationToken.token,
      identifier: email.toLowerCase(),
    },
    data: {
      passCode,
      verificationUrl: url,
    },
  })

  return verifiedToken.passCode
}

/**
 * This function gets the verification token.
 *
 * @param form - The form object containing the email and pin.
 *
 * @returns The status and URL of the verification token.
 *
 * ### Explanation:
 * - The function takes the following parameter: `form`.
 * - It gets the verification token from the database.
 * - It returns the status and URL of the verification token.
 *
 * ### Types:
 * - `form` is the form object containing the email and pin.
 * - The function returns the status and URL of the verification token.
 */
export async function getVerificationToken(
  form: z.infer<typeof authOTPCodeSchema>
) {
  const data = authOTPCodeSchema.parse({
    email: form.email,
    pin: form.pin,
  })

  const verificationTokens = await db.verificationToken.findMany({
    where: {
      identifier: form.email.toLowerCase(),
      passCode: {
        not: null,
      },
    },
    orderBy: {
      expires: "desc",
    },
  })

  const verificationToken = verificationTokens[0]

  if (!verificationToken) {
    return new Response(null, { status: 404 })
  }

  return {
    status: data.pin === verificationToken.passCode,
    url:
      data.pin === verificationToken.passCode
        ? verificationToken.verificationUrl
        : "",
  }
}
