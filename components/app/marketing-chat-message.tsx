"use client"

import { ReactNode } from "react"
import { StreamableValue, useStreamableValue } from "ai/rsc"
import { motion } from "framer-motion"

import { Icons } from "@/components/shared/icons"
import { Markdown } from "@/components/shared/markdown"

export const TextStreamMessage = ({
  content,
}: {
  content: StreamableValue
}) => {
  const [text] = useStreamableValue(content)

  return (
    <motion.div
      className={`flex w-full flex-row gap-4 px-4 first-of-type:pt-20 md:w-[500px] md:px-0`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex size-[24px] shrink-0 flex-col items-center justify-center text-zinc-400">
        <Icons.logo />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </motion.div>
  )
}

export const Message = ({
  role,
  content,
}: {
  role: "assistant" | "user"
  content: string | ReactNode
}) => {
  return (
    <motion.div
      className={`flex w-full flex-row gap-4 px-4 first-of-type:pt-20 md:w-[500px] md:px-0`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex size-[24px] shrink-0 flex-col items-center justify-center text-zinc-400">
        {role === "assistant" ? <Icons.logo /> : <Icons.user />}
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
          {content}
        </div>
      </div>
    </motion.div>
  )
}
