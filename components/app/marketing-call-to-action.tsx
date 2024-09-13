"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

import { WaitlistForm } from "@/components/app/marketing-waitlist"
import { Marquee } from "@/components/fancy/marquee"
import { Icons } from "@/components/shared/icons"

const tiles = [
  {
    icon: <Icons.lock className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.mail className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.databaseZap className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.blog className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.globe className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.prisma className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.copy className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]"></div>
    ),
  },
  {
    icon: <Icons.zap className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]"></div>
    ),
  },
]

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
  return array
}

const Card = (card: { icon: JSX.Element; bg: JSX.Element }) => {
  const id = useId()
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      })
    }
  }, [controls, inView])

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        "relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      {card.icon}
      {card.bg}
    </motion.div>
  )
}

export function MarketingCallToAction() {
  const [randomTiles1, setRandomTiles1] = useState<typeof tiles>([])
  const [randomTiles2, setRandomTiles2] = useState<typeof tiles>([])
  const [randomTiles3, setRandomTiles3] = useState<typeof tiles>([])
  const [randomTiles4, setRandomTiles4] = useState<typeof tiles>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRandomTiles1(shuffleArray([...tiles]))
      setRandomTiles2(shuffleArray([...tiles]))
      setRandomTiles3(shuffleArray([...tiles]))
      setRandomTiles4(shuffleArray([...tiles]))
    }
  }, [])

  return (
    <section id="cta">
      <div className="container flex w-full flex-col items-center justify-center p-4 py-20">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border">
          <Marquee
            reverse
            className="-delay-[200ms] [--duration:20s]"
            repeat={4}
          >
            {randomTiles1.map((review, idx) => (
              <Card key={idx} {...review} />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:30s]" repeat={4}>
            {randomTiles2.map((review, idx) => (
              <Card key={idx} {...review} />
            ))}
          </Marquee>
          <Marquee
            reverse
            className="-delay-[200ms] [--duration:20s]"
            repeat={4}
          >
            {randomTiles3.map((review, idx) => (
              <Card key={idx} {...review} />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:30s]" repeat={4}>
            {randomTiles4.map((review, idx) => (
              <Card key={idx} {...review} />
            ))}
          </Marquee>
          <div className="container absolute z-10">
            <div className="mx-auto flex size-24 items-center justify-center rounded-[2rem] border bg-white/10 p-3 shadow-2xl backdrop-blur-md lg:size-32 dark:bg-black/10">
              <Icons.logoLucide className="text-primary size-16 lg:size-20" />
            </div>
            <div className="text-secondary-foreground z-10 mt-4 flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold lg:text-4xl">
                Unbeatable performance and speed
              </h1>
              <p className="mt-2">
                Join the waitlist to get early access to our AI-powered
                platform.
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <WaitlistForm />
              </div>
            </div>
            <div className="absolute inset-0 -z-10 rounded-full bg-white opacity-40 blur-xl dark:bg-black" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-transparent to-white to-70% dark:to-black" />
        </div>
      </div>
    </section>
  )
}
