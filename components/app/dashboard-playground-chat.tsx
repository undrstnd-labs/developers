import React, { useRef } from "react"
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
import { User } from "@prisma/client"

const messageSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
})

interface DashboardPlaygroundChatProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  onCopyMessage: (message: string) => void
  isValidation: boolean
  user: User
}

export function DashboardPlaygroundChat({
  messages,
  onSendMessage,
  onCopyMessage,
  isValidation,
  user
}: DashboardPlaygroundChatProps) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const onSubmit = (data: z.infer<typeof messageSchema>) => {
    if (isValidation) {
      form.setError("message", { message: "Apply changes in the parameters" })
    }
    onSendMessage(data.message)
    form.reset()
  }

  return (
    <div className="flex size-full flex-col">
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
              <div
                className={`flex max-w-[80%] items-start space-x-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar
                  className={
                    message.role === "user" ? "bg-primary" : "bg-secondary"
                  }
                >
                  <AvatarFallback>
                    {message.role === "user" ? "U" : "A"}
                  </AvatarFallback>
                  <AvatarImage
                    src={
                      message.role === "user"
                        ? user.image
                        : "/favicons/android-chrome-192x192.png"
                    }
                  />
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="mt-2 flex justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6"
                            onClick={() => onCopyMessage(message.content)}
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 p-4">
          <div className="relative">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Type your message here..."
                        className="flex-1 resize-none pr-10"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        {...field}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute bottom-2 right-2 size-8"
                        disabled={isValidation}
                      >
                        <Icons.send className="size-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
