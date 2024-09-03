"use client"

import { ReactNode, useRef, useState } from "react"
import Link from "next/link"
import { useActions } from "ai/rsc"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom"

import { Message } from "@/components/app/marketing-chat-message"
import { Icons } from "@/components/shared/icons"

export function MarketingChat() {
  const { sendMessage } = useActions()

  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Array<ReactNode>>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()

  const suggestedActions = [
    { title: "View all", label: "my cameras", action: "View all my cameras" },
    {
      title: "Show me",
      label: "my smart home hub",
      action: "Show me my smart home hub",
    },
    {
      title: "How much",
      label: "electricity have I used this month?",
      action: "Show electricity usage",
    },
    {
      title: "How much",
      label: "water have I used this month?",
      action: "Show water usage",
    },
  ]

  return (
    <div className="justify-cente flex h-dvh flex-row pb-20 ">
      <div className="flex flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="flex h-full w-dvw flex-col items-center gap-3 overflow-y-scroll"
        >
          {messages.length === 0 && (
            <motion.div className="h-[350px] w-full px-4 pt-20 md:w-[500px] md:px-0">
              <div className="text-secondary-foreground dark:border-muted-foreground/40 flex flex-col gap-4 rounded-lg border p-6 text-sm">
                <p className="flex flex-row items-center justify-center gap-4">
                  <Icons.logo className="size-8" />
                  <span className="text-lg font-medium">{siteConfig.name}</span>
                </p>
                <p className="text-muted-foreground">
                  The streamUI function allows you to stream React Server
                  Components along with your language model generations to
                  integrate dynamic user interfaces into your application.
                </p>
                <p className="text-muted-foreground">
                  {" "}
                  Learn more about the{" "}
                  <Link
                    className="text-blue-500 dark:text-blue-400"
                    href="https://sdk.vercel.ai/docs/ai-sdk-rsc/streaming-react-components"
                    target="_blank"
                  >
                    streamUI{" "}
                  </Link>
                  hook from Vercel AI SDK.
                </p>
              </div>
            </motion.div>
          )}
          {messages.map((message) => message)}
          <div ref={messagesEndRef} />
        </div>

        <div className="mx-auto mb-4 grid w-full gap-2 px-4 sm:grid-cols-2 md:max-w-[500px] md:px-0">
          {messages.length === 0 &&
            suggestedActions.map((action, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 * index }}
                key={index}
                className={index > 1 ? "hidden sm:block" : "block"}
              >
                <button
                  onClick={async () => {
                    setMessages((messages) => [
                      ...messages,
                      <Message
                        key={messages.length}
                        role="user"
                        content={action.action}
                      />,
                    ])
                    const response: ReactNode = await sendMessage(action.action)
                    setMessages((messages) => [...messages, response])
                  }}
                  className="flex w-full flex-col rounded-lg border border-zinc-200 p-2 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <span className="font-medium">{action.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {action.label}
                  </span>
                </button>
              </motion.div>
            ))}
        </div>

        <form
          className="relative flex flex-col items-center gap-2"
          onSubmit={async (event) => {
            event.preventDefault()

            setMessages((messages) => [
              ...messages,
              <Message key={messages.length} role="user" content={input} />,
            ])
            setInput("")

            const response: ReactNode = await sendMessage(input)
            setMessages((messages) => [...messages, response])
          }}
        >
          <input
            ref={inputRef}
            className="w-full max-w-[calc(100dvw-32px)] rounded-md bg-zinc-100 px-2 py-1.5 text-zinc-800 outline-none md:max-w-[500px] dark:bg-zinc-700 dark:text-zinc-300"
            placeholder="Send a message..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
            }}
          />
        </form>
      </div>
    </div>
  )
}
