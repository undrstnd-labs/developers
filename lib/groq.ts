import { createOpenAI } from "@ai-sdk/openai"

import { env } from "@/env.mjs"

export const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: env.GROQ_API_KEY,
})
