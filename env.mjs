import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    FROM_EMAIL: z.string().min(1),
    FROM_EMAIL_PASSWORD: z.string().min(1),
    SMTP_SERVER: z.string().min(1),
    FROM_EMAIL_GMAIL: z.string().min(1),
    SMTP_PORT: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
    GROQ_API_ENDPOINT: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_EMAIL_GMAIL: process.env.FROM_EMAIL_GMAIL,
    SMTP_PORT: process.env.SMTP_PORT,
    FROM_EMAIL_PASSWORD: process.env.FROM_EMAIL_PASSWORD,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_API_ENDPOINT: process.env.GROQ_API_ENDPOINT,
  },
})
