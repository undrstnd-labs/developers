'use client'

import React, { useState } from 'react'
import { DashboardPlaygroundChat } from '@/components/app/dashboard-playground-chat'
import { DashboardPlaygroundParameters } from '@/components/app/dashboard-playground-paramters'
import { setApiKey, llmQuery, ragQuery } from '@/actions/playground'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface FormData {
  apiKey: string
  endpoint: string
  datasourceKey: string
  model: string
  isStreaming: boolean
  temperature: number
  maxTokens: number
}

export function LLMPlayground() {
  const [messages, setMessages] = useState<Message[]>([])
  const [parameters, setParameters] = useState<FormData>({
    apiKey: '',
    endpoint: 'llm',
    datasourceKey: '',
    model: 'llama-3.1-8b-instant',
    isStreaming: false,
    temperature: 0.7,
    maxTokens: 2048,
  })

  const handleSendMessage = async (message: string) => {
    const newUserMessage: Message = { role: 'user', content: message }
    setMessages([...messages, newUserMessage])

    try {
      const payload = {
        stream: parameters.isStreaming,
        modelId: parameters.model,
        datasourceToken: parameters.endpoint === 'llm' ? 'llama3-8b-8192' : parameters.datasourceKey,
        similaritySearchLength: '1',
        system: 'You are called Undrstnd',
        messages: [
          { name: 'system', content: 'Hello, how can I help you?', role: 'system' },
          { name: 'user', content: message, role: 'user' },
        ],
      }

      const response = parameters.endpoint === 'llm' 
        ? await llmQuery(payload)
        : await ragQuery(payload)

      const newAssistantMessage: Message = { role: 'assistant', content: response.output }
      setMessages(prevMessages => [...prevMessages, newAssistantMessage])
    } catch (error) {
      console.log('Error sending message:', error)
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, an error occurred while processing your request.' }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    }
  }

  const handleCopyMessage = (message: Message) => {
    navigator.clipboard.writeText(message.content)
  }

  const handleParametersSubmit = (data: FormData) => {
    setParameters(data)
    setApiKey(data.apiKey)
    console.log('Parameters updated:', data)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <div className="flex-1 overflow-hidden">
        <DashboardPlaygroundChat
          messages={messages}
          onSendMessage={handleSendMessage}
          onCopyMessage={handleCopyMessage}
        />
      </div>
      <div className="w-1/3 overflow-y-auto border-l border-border">
        <DashboardPlaygroundParameters onSubmit={handleParametersSubmit} />
      </div>
    </div>
  )
}