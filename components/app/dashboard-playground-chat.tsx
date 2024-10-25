import React from "react"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface DashboardPlaygroundChatProps {
  messages: Message[]
  currentMessage: string
  setCurrentMessage: (message: string) => void
  handleSendMessage: () => void
  handleCopyMessage: (message: Message) => void
}

export function DashboardPlaygroundChat({
  messages,
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  handleCopyMessage,
}: DashboardPlaygroundChatProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block rounded-lg p-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {message.content}
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => handleCopyMessage(message)}
              >
                <Icons.copy className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Icons.send className="mr-2 size-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
