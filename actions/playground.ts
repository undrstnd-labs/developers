const API_BASE_URL = "/api"

interface Message {
  name: string
  content: string
  role: string
}

interface LLMRequestPayload {
  stream: boolean
  modelId: string
  system: string
  datasourceToken: string
  messages: Message[]
}

interface RAGRequestPayload {
  stream: boolean
  modelId: string
  datasourceToken: string
  similaritySearchLength: string
  messages: Message[]
}

interface APIResponse {
  output: string
  funding: {
    amount: string
    currency: string
  }
  usage: {
    tokensUsed: number
    date: string
  }
}

let apiKey = "udsk_demo-api-key-x-00000"

export const setApiKey = (newApiKey: string) => {
  apiKey = newApiKey
}

export const llmQuery = async (
  payload: LLMRequestPayload
): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Error in LLM query: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in LLM query:", error)
    throw error
  }
}

export const ragQuery = async (
  payload: RAGRequestPayload
): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/rag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Error in RAG query: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in RAG query:", error)
    throw error
  }
}
