'use client'

import React, { useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Message } from "@/types"

import { Icons } from "@/components/shared/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

const messageSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
})

interface DashboardPlaygroundChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  onCopyMessage: (message: string) => void
  isValidation: boolean
}

export function DashboardPlaygroundChat({
  messages,
  onSendMessage,
  onCopyMessage,
  isValidation,
}: DashboardPlaygroundChatProps) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const onSubmit = (data: z.infer<typeof messageSchema>) => {
    if (isValidation) {
      form.setError("message", { message: "Apply changes in the parameters" })
    } else {
      onSendMessage(data.message)
      form.reset()
    }
  }

  return (
    <Card className="flex size-full flex-col">
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
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
                <div
                  className={`group flex max-w-[80%] items-start space-x-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role !== "user" && (
                    <Avatar className="bg-primary">
                      <AvatarFallback>U</AvatarFallback>
                      <AvatarImage src="/favicons/android-chrome-192x192.png" />
                    </Avatar>
                  )}
                  <div
                    className={`relative rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="absolute -right-2 top-0 hidden transform translate-x-full group-hover:flex items-center space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onCopyMessage(message.content)}
                            >
                              <Icons.copy className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Copy message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                              <Icons.clock className="h-3 w-3 inline mr-1" />
                              {/* {message.generationTime}s */}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {/* <p>{message.tokens} tokens used</p> */}
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="border-t p-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Type your message here..."
                        className="pr-12 resize-none"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            form.handleSubmit(onSubmit)()
                          }
                        }}
                        {...field}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute bottom-2 right-2 h-8 w-8"
                        disabled={isValidation}
                      >
                        <Icons.send className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}