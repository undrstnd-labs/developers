import { createOpenAI } from "@ai-sdk/openai"
import { OpenAIEmbeddings } from "@langchain/openai"

import { env } from "@/env.mjs"

const demo_client = createOpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: env.GR_LPU_ENDPOINT,
})

const undrstnd_client = (api_key: string) => {
  return createOpenAI({
    baseURL: env.GR_LPU_ENDPOINT,
    apiKey: api_key,
  })
}

const embeddingModel = new OpenAIEmbeddings({
  openAIApiKey: env.OPENAI_API_KEY,
})

export { demo_client, undrstnd_client, embeddingModel }
