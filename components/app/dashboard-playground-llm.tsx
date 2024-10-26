"use client"

import React, { useState } from "react"
import { models } from "@/data/models"
import { APIToken, Resource,  } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Message } from "@/types"

import {
  playgroundMessageSchema,
  playgroundParamsSchema,
} from "@/config/validation"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { DashboardPlaygroundChat } from "@/components/app/dashboard-playground-chat"
import { DashboardPlaygroundParameters } from "@/components/app/dashboard-playground-paramters"
import { Separator } from "@/components/ui/separator"

import { llmQuery, ragQuery } from "@/actions/playground"

type FormData = z.infer<typeof playgroundParamsSchema>
type MessageFormData = z.infer<typeof playgroundMessageSchema>

interface LLMPlaygroundProps {
  keys: APIToken[]
  resources: Resource[]
}

export function LLMPlayground({ keys, resources }: LLMPlaygroundProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello, how can I help you?",
      role: "system",
    },
  ])
  const [paramters, setParameters] = useState<FormData>({
    apiKey: keys[0]?.id || "",
    endpoint: "llm",
    datasourceKey: "",
    model: models[6].label,
    isStreaming: false,
    temperature: 0.7,
    maxTokens: 2048,
  })
  const { copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const messageForm = useForm<MessageFormData>({
    defaultValues: {
      message: "",
    },
  })

  const handleMessageSubmitForm = async (message: string) => {
    await handleSendMessage(message)
    messageForm.reset()
  }

  const handleSendMessage = async (message: string) => {
    if (!paramters) {
      console.log("Parameters not set")
      messageForm.setError("message", { message: "Parameters not set" })
      return
    }

    const newUserMessage: Message = { role: "user", content: message }
    setMessages([...messages, newUserMessage])

    try {
      const payload = {
        apiKey: paramters.apiKey,
        stream: paramters.isStreaming,
        modelId: paramters.model,
        datasourceToken:
          paramters.endpoint === "rag" && paramters.datasourceKey
            ? paramters.datasourceKey
            : "",
        similaritySearchLength: "1",
        system: "You are called Undrstnd",
        messages: [
          ...messages.map((message) => ({
            name: message.role,
            content: message.content,
            role: message.role,
          })),

        ],
      }

      const response =
        paramters.endpoint === "llm"
          ? await llmQuery(payload)
          : await ragQuery(payload)

      const newAssistantMessage: Message = {
        role: "assistant",
        content: response.output,
      }
      setMessages((prevMessages) => [...prevMessages, newAssistantMessage])
    } catch (error) {
      console.log("Error sending message:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, an error occurred while processing your request.",
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  const handleParametersSubmit = (data: FormData) => {
    setParameters(data)
  }

  return (
    <div className="flex h-full space-x-2 bg-background">
      <div className="flex-1 overflow-hidden">
        <DashboardPlaygroundChat
          messages={messages}
          onSendMessage={handleMessageSubmitForm}
          onCopyMessage={copyToClipboard}
          isValidation={!!!paramters}
        />
      </div>

      <Separator orientation="vertical" />

      <div className="w-1/3 overflow-y-auto">
        <DashboardPlaygroundParameters
          onSubmit={handleParametersSubmit}
          keys={keys}
        />
      </div>
    </div>
  )
}
