import React from "react"

import { env } from "@/env.mjs"

async function getStream() {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/rag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.UNDRSTND_API_KEY,
    },
    body: JSON.stringify({
      stream: false,
      modelId: "llama3-8b-8192",
      system: "Your name is Undrstnd aneeed you are very helpful",
      datasourceToken: "udds_o6fxx519nua",
      similaritySearchLength: "1",
      messages: [
        {
          name: "user",
          content: "Which site afdgfdgfnd sub-site is/are involved?",
          role: "user",
        },
      ],
    }),
  })

  if (!response.ok) {
    return { error: await response.json() }
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
