"use server"

import { ReactNode } from "react"
import { openai } from "@ai-sdk/openai"
import { CoreMessage, generateId } from "ai"
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc"

import { groq } from "@/lib/groq"

import { TextStreamMessage } from "@/components/app/marketing-chat-message"

export interface Hub {
  climate: Record<"low" | "high", number>
  lights: Array<{ name: string; status: boolean }>
  locks: Array<{ name: string; isLocked: boolean }>
}

export async function sendMessage(message: string) {
  const messages = getMutableAIState<typeof AI>("messages")

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ])

  const contentStream = createStreamableValue("")
  const textComponent = <TextStreamMessage content={contentStream.value} />

  const { value: stream } = await streamUI({
    model: groq("llama3-8b-8192"),
    system: `
      - you are a friendly home automation assistant
      - reply in lower case
    `,
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
  onSetAIState: async ({ state, done }) => {
    "use server"

    if (done) {
      // save to database
    }
  },
})
