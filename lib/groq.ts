import { createOpenAI } from "@ai-sdk/openai"

import { env } from "@/env.mjs"

export const groq = createOpenAI({
  baseURL: env.GROQ_API_ENDPOINT,
  apiKey: env.GROQ_API_KEY,
})

export const groq_client = (api_key: string) => {
  return createOpenAI({
    baseURL: env.GROQ_API_ENDPOINT,
    apiKey: api_key,
  })
}
