import React from "react"

import { env } from "@/env.mjs"

async function getStream() {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "udsk_demo-api-key-x-00000",
    },
    body: JSON.stringify({
      stream: false,
      system: "groq",
      modelId: "mixtral-8x7b-32768",
      messages: [
        {
          name: "system",
          content: "Hello, how can I help you?",
          role: "system",
        },
        {
          name: "user",
          content: "What is the weather like in San Francisco?",
          role: "user",
        },
      ],
    }),
  })

  if (!response.ok) {
    return { error: response.statusText }
  }

  return response.json()
}

export default async function page() {
  const stream = await getStream()

  return (
    <div>
      <h1>Stream</h1>
      <pre>{JSON.stringify(stream, null, 2)}</pre>
    </div>
  )
}
