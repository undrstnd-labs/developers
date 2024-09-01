import React from "react"

import { env } from "@/env.mjs"

async function getStream() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/models/mixtral-8x7b-32768/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "udsk_demo-api-key-x-00000",
      },
      body: JSON.stringify({
        stream: false,
        system: "groq",
        messages: [
          {
            name: "system",
            content: "Hello, how can I help you? x=5",
            role: "system",
          },
          {
            name: "user",
            content: "What is 'x'",
            role: "user",
          },
        ],
      }),
    }
  )

  return await response.json()
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
