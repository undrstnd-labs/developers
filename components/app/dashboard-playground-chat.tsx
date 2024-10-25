'use client'

import React, { useRef, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
  }

interface DashboardPlaygroundChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  onCopyMessage: (message: Message) => void
}

export function DashboardPlaygroundChat({
  messages,
  onSendMessage,
  onCopyMessage,
}: DashboardPlaygroundChatProps) {
  const { control, handleSubmit, reset } = useForm<{ message: string }>({
    defaultValues: {
      message: "",
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const onSubmit = (data: { message: string }) => {
    onSendMessage(data.message)
    reset()
  }

  return (
    <Card className="flex size-full flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto pr-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[80%] items-start space-x-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={message.role === "user" ? "bg-primary" : "bg-secondary"}>
                    <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
                    <AvatarImage src={message.role === "user" ? "/user-avatar.png" : "/ai-avatar.png"} />
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="mt-2 flex justify-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-6"
                              onClick={() => onCopyMessage(message)}
                            >
                              <Icons.copy className="size-2" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="relative">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="Type your message here..."
                  className="flex-1 resize-none pr-10"
                  rows={3}
                  {...field}
                />
              )}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute bottom-2 right-2 size-8"
            >
              <Icons.send className="size-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}