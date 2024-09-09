"use server"

import { ReactNode } from "react"
import { faqs } from "@/data/faqs"
import { createOpenAI } from "@ai-sdk/openai"
import { CoreMessage, generateId } from "ai"
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc"

import { env } from "@/env.mjs"

import { TextStreamMessage } from "@/components/app/marketing-chat-message"

export async function sendMessage(message: string, model: string) {
  const messages = getMutableAIState<typeof AI>("messages")

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ])

  const contentStream = createStreamableValue("")
  const textComponent = <TextStreamMessage content={contentStream.value} />

  const undrstnd = createOpenAI({
    apiKey: env.GROQ_API_KEY,
    baseURL: env.GROQ_API_ENDPOINT,
  })

  const { value: stream } = await streamUI({
    model: undrstnd(model) as any,
    system: `
      - Your name is "Undrstnd" and you are a chatbot.
      - You are to showcase and preview how fast and cheap our inference can be.
        These are the frequently asked questions, and you are to provide answers to them.
        ${faqs
          .map(
            (faq) => `
            ${faq.qa
              .map(
                (q) => `
              - Question: ${q.question}
                Answer: ${q.answer.toString().replace(/<[^>]*>?/gm, "")}
            `
              )
              .join("\n")}`
          )
          .join("\n")}`,
    messages: messages.get() as CoreMessage[],
    text: async function* ({ content, done }) {
      if (done) {
        messages.done([
          ...(messages.get() as CoreMessage[]),
          { role: "assistant", content },
        ])

        contentStream.done()
      } else {
        contentStream.update(content)
      }

      return textComponent
    },
  })

  return stream
}

export type UIState = Array<ReactNode>

export type AIState = {
  chatId: string
  messages: Array<CoreMessage>
}

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
})
