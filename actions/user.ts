"use server"

import { User } from "@prisma/client"

import { db } from "@/lib/prisma"

export async function isBanned(email: string) {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  })

  return user?.deletedAt ? true : false
}

export async function getUsers(length: number) {
  return await db.user.findMany({
    take: length,
  })
}

export async function banUser(id: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

export async function pardonUser(id: string) {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: null,
    },
  })
}

export async function updateUser(email: string, data: Partial<User>) {
  return await db.user.update({
    where: {
      email,
    },
    data,
  })
}
