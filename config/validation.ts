import { UserType } from "@prisma/client"
import { z } from "zod"

export const waitlistSchema = z.object({
  email: z.string().email(),
})

export const authOTPCodeSchema = z.object({
  email: z.string().email({
    message: "Your email is invalid",
  }),
  pin: z.string().length(6),
})

export const authUserEmailSchema = z.object({
  email: z.string().email({
    message: "Your email is invalid",
  }),
})

export const authRegisterSchema = z.object({
  type: z.nativeEnum(UserType),
  name: z.string().min(3, {
    message: "Your name is required",
  }),
})
