"use client"

import React from "react"
import { motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1]

export function WordPullUp({
  text,
  className,
}: {
  text: string[]
  className?: string
}) {
  return (
    <div className={className}>
      {text.map((text, index) => (
        <motion.span
          key={index}
          className="px-1 md:px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.2,
            ease,
          }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  )
}
