"use server"

import { getCountryName } from "@/lib/location"
import { db } from "@/lib/prisma"

import { sendMail } from "@/actions/mail"

export async function subscribeAction(formData: FormData, userGroup: string) {
  const email = formData.get("email") as string
  const country = getCountryName()

  try {
    await db.waitlist.create({
      data: {
        email,
        country,
      },
    })

    await sendMail("whitelist", { email })
  } catch (error) {
    console.log(error)
    return false
  }

  return country
}
