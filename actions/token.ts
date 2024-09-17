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
