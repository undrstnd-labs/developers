"use client"

import { motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1]

export function FramerWrapper(props: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
      className="z-30"
    >
      {props.children}
    </motion.div>
  )
}

export function FramerComponentWrapper({
  children,
  initial,
  animate,
  exit,
  className,
  transition,
}: {
  children: React.ReactNode
  initial: { y: number; opacity: number; filter?: string }
  animate: { y: number; opacity: number; filter?: string }
  exit?: { y: number; opacity: number; filter?: string }
  transition: { duration: number; delay?: number; staggerChildren?: number }
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        ...transition,
        ease,
      }}
    >
      {children}
    </motion.div>
  )
}
