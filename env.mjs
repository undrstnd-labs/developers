import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    LOGSNOG_API_TOKEN: z.string().min(1),
    LOGSNOG_PROJECT_NAME: z.string().min(1),
    LOOPS_API_TOKEN: z.string().min(1),
    LOOPS_NEWSLETTER_WHITELIST: z.string().min(1),
    FROM_EMAIL: z.string().min(1),
    FROM_EMAIL_GMAIL: z.string().min(1),
    FROM_EMAIL_PASSWORD: z.string().min(1),
    SMTP_SERVER: z.string().min(1),
    SMTP_PORT: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    LOGSNOG_API_TOKEN: process.env.LOGSNOG_API_TOKEN,
    LOGSNOG_PROJECT_NAME: process.env.LOGSNOG_PROJECT_NAME,
    LOOPS_API_TOKEN: process.env.LOOPS_API_TOKEN,
    LOOPS_NEWSLETTER_WHITELIST: process.env.LOOPS_NEWSLETTER_WHITELIST,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_EMAIL_GMAIL: process.env.FROM_EMAIL_GMAIL,
    FROM_EMAIL_PASSWORD: process.env.FROM_EMAIL_PASSWORD,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SMTP_PORT: process.env.SMTP_PORT,
  },
})
