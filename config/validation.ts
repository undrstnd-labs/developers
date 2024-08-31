import { z } from "zod"

// TODO: Translate the error messages
export const waitlistSchema = z.object({
  email: z.string().email(),
})
