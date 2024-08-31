import React from "react"

import { env } from "@/env.mjs"

async function getStream() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/models/mixtral-8x7b-32768/predict`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stream: true,
        system: "groq",
        messages: [
          {
            name: "system",
            content: "Hello, how can I help you?",
            role: "system",
          },
          {
            name: "user",
            content: "I need help with my taxes.",
            role: "user",
          },
        ],
      }),
    }
  )

  const data = await response.json()
  console.log(data)
  return data
}

export default async function page() {
  const stream = await getStream()
  console.log(stream)
  return (
    <div>
      <h1>Stream</h1>
      <pre>{JSON.stringify(stream, null, 2)}</pre>
    </div>
  )
}
