"use client"

import React, { useState } from "react"

import { DashboardPlaygroundChat } from "@/components/app/dashboard-playground-chat"
import { DashboardPlaygroundParameters } from "@/components/app/dashboard-playground-paramters"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function LLMPlayground() {
  const [apiKey, setApiKey] = useState("")
  const [endpoint, setEndpoint] = useState("llm")
  const [datasourceKey, setDatasourceKey] = useState("")
  const [model, setModel] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { role: "user", content: currentMessage }])
      // Here you would typically send the message to the LLM API
      // and then add the response to the messages
      setCurrentMessage("")
    }
  }

  const handleCopyMessage = (message: Message) => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <DashboardPlaygroundChat
        messages={messages}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        handleSendMessage={handleSendMessage}
        handleCopyMessage={handleCopyMessage}
      />
      <DashboardPlaygroundParameters
        apiKey={apiKey}
        setApiKey={setApiKey}
        endpoint={endpoint}
        setEndpoint={setEndpoint}
        datasourceKey={datasourceKey}
        setDatasourceKey={setDatasourceKey}
        model={model}
        setModel={setModel}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
      />
    </div>
  )
}
