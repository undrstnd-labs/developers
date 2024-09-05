"use server"

import { db } from "@/lib/prisma"

export async function addWaitlist(email: string) {
  return await db.waitlist.create({
    data: {
      email,
    },
  })
}
