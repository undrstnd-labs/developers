"use client"

import { ReactNode, useRef, useState } from "react"
import Link from "next/link"
import { models } from "@/data/models"
import { useActions } from "ai/rsc"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"

import { Message } from "@/components/app/marketing-chat-message"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"

const suggestedActions = [
  {
    title: "Speed Test",
    label: "Fastest Inference",
    action: "Test the speed of the inference for my data and model.",
  },
  {
    title: "Efficiency Test",
    label: "Cost-Effective Inference",
    action:
      "Compare the cost of running inference on my current setup versus a more efficient one.",
  },
  {
    title: "Performance Benchmark",
    label: "Optimized Inference",
    action:
      "Identify areas where the inference process can be optimized to improve speed and reduce costs.",
  },
  {
    title: "Latency Analysis",
    label: "Real-Time Inference",
    action:
      "Measure the latency of the inference process and determine if it meets the real-time requirements.",
  },
]

export function MarketingChat() {
  const { sendMessage } = useActions()

  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState<string>("")
  const [model, setModel] = useState<string>("llama3-8b-8192")
  const [messages, setMessages] = useState<Array<ReactNode>>([])

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-secondary-foreground/20">
      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white dark:from-black sm:h-32" />

      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
                Chat with our AI-powered Chatbot
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get started with our AI-powered chatbot to test the speed,
                efficiency, and performance of your models.
              </p>
              <div className="mt-10">
                <h2 className="text-lg font-medium text-muted-foreground">
                  Select a model to start
                </h2>
                <Combobox
                  frameworks={models.map((model) => ({
                    label: model.value,
                    value: model.label,
                    icon: model.image,
                  }))}
                  value={model}
                  onChange={(value) => setModel(value)}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div
            className="ring-primary-50 absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-secondary-foreground/10 ring-1 dark:bg-black md:-mr-20 lg:-mr-36"
            aria-hidden="true"
          />
          <div className="shadow-lg md:rounded-3xl">
            <div className="[clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
              <div
                className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-foreground opacity-20 ring-1 ring-inset ring-primary-foreground md:ml-20 lg:ml-36"
                aria-hidden="true"
              />
              <div className="flex h-full flex-row justify-center bg-muted px-2 pb-20 sm:px-8">
                <div className="border-1 flex h-[640px] flex-col justify-between gap-4 overflow-y-scroll p-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-secondary">
                  <div className="flex flex-col items-center justify-center gap-3 pt-4">
                    {messages.length === 0 && (
                      <motion.div className="h-[350px] px-4 md:w-[500px] md:px-0">
                        <div className="flex flex-col gap-4 rounded-lg border p-6 text-sm text-secondary-foreground dark:border-muted-foreground/40">
                          <p className="flex flex-row items-center justify-center gap-4">
                            <Icons.logo className="size-8" />
                            <span className="text-lg font-medium">
                              {siteConfig.name}
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            This is a demo chat interface for our AI-powered
                            chatbot.
                            <br />
                            Learn more about the{" "}
                            <Link
                              className="text-primary underline"
                              href="/docs"
                              target="_blank"
                            >
                              integration of Undrstnd{" "}
                            </Link>
                            .
                          </p>
                        </div>
                      </motion.div>
                    )}
                    {messages.map((message) => message)}
                  </div>

                  <div className="mx-auto mb-4 grid w-full gap-2 px-4 sm:grid-cols-2 md:px-0">
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
                              const response: ReactNode = await sendMessage(
                                action.action,
                                model
                              )
                              setMessages((messages) => [...messages, response])
                            }}
                            className="flex w-full flex-col rounded-lg border border-secondary p-2 text-left text-sm text-secondary-foreground transition-colors hover:bg-muted"
                          >
                            <span className="font-medium">{action.title}</span>
                            <span className="text-muted-foreground/70">
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
                        <Message
                          key={messages.length}
                          role="user"
                          content={input}
                        />,
                      ])
                      setInput("")

                      const response: ReactNode = await sendMessage(
                        input,
                        model
                      )
                      setMessages((messages) => [...messages, response])
                    }}
                  >
                    <div className="relative w-full max-w-[calc(100dvw-32px)] md:max-w-[500px]">
                      <Input
                        ref={inputRef}
                        className="w-full bg-white/60 pr-10 outline-none ring-transparent focus-visible:ring-0 dark:bg-black/60"
                        placeholder="Send a message..."
                        value={input}
                        onChange={(event) => {
                          setInput(event.target.value)
                        }}
                      />
                      <Button
                        type="submit"
                        variant={"ghost"}
                        className="absolute right-0 top-0 h-full px-3 "
                      >
                        <Icons.send className="size-5 text-primary" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white dark:from-black sm:h-80" />
    </div>
  )
}
