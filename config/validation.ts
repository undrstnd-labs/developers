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

export const apiTokenSchema = z.object({
  name: z.string().min(2).max(50),
})

export const playgroundParamsSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  endpoint: z.string().min(1, { message: "Endpoint is required" }),
  datasourceKey: z.string().optional(),
  model: z.string().min(1, { message: "Model is required" }),
  isStreaming: z.boolean(),
  temperature: z.number().min(0).max(1),
  maxTokens: z.number().min(1),
})

export const playgroundMessageSchema = z.object({
  message: z.string().min(1),
})
