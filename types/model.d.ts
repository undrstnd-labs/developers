export type Model = {
  id: string
  active: boolean

  name: string
  description: string

  developer: string
  provider: string
  source: string
  tags: string[]

  maxFileSize?: number
  maxContextWindow?: number
  pricing: number
}

export type Message = {
  name: string
  content: string
  role: "system" | "user" | "assistant" | "tool"
}

export type ErrorResponse = {
  status: number
  req_token: string
  modelId?: string
  message?: string
}
