import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { encoding_for_model } from "tiktoken"

import { Message } from "@/types/model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAPIToken() {
  return `udsk_${Math.random().toString(36).substring(2)}`
}

export function estimateTokens(messages: Message[]): number {
  const encoder = encoding_for_model("gpt-4-32k-0314")
  let totalTokens = 0

  for (const message of messages) {
    const messageTokens = encoder.encode(message.content)
    totalTokens += messageTokens.length
  }

  return totalTokens
}
