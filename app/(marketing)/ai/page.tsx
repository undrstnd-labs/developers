import React from "react"

import { env } from "@/env.mjs"

async function getStream() {
  const response = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/rag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "udsk_demo-api-key-x-00000",
    },
    body: JSON.stringify({
      "stream": false,
      "modelId": "llama3-8b-8192",
      "system": "Your name is Undrstnd and you are very helpful",
      "datasourceToken": "udds_6fq0ck6cbbk",
      "similaritySearchLength": "1",
      "messages": [
        {
          "name": "user",
          "content": "Which site and sub-site is/are involved?",
          "role": "user"
        }
      ]
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
