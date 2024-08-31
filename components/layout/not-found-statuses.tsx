"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import type { Status } from "@/types"

import { getNotFoundStatus } from "@/config/consts"

export function NotFoundStatuses() {
  const t = useTranslations("app.components.layout.not-found-statuses")
  const data = getNotFoundStatus(t)

  const ref = useRef(false)
  const [statuses, setStatuses] = useState<Status[]>([])
  const scrollRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    setStatuses([
      {
        name: "<Request URL>",
        description: location.origin,
      },
    ])
  }, [])

  useEffect(() => {
    let index = 1

    function addItems() {
      const destinationArray: Status[] = []
      if (index < data.length - 1) {
        destinationArray.push(data[index])

        setStatuses((prev) => [...prev, data[index]])
        index++

        scrollRef.current?.scrollTo({
          top: 10000000,
          behavior: "smooth",
        })

        setTimeout(addItems, 800)
      }
    }

    if (!ref.current) {
      addItems()

      ref.current = true
    }
  }, [data])

  return (
    <ul
      className="flex h-[290px] flex-col space-y-4 overflow-auto p-4 font-mono text-xs"
      ref={scrollRef}
    >
      {statuses?.map((status) => {
        return (
          <li className="flex flex-col" key={status.name}>
            <span className="mb-1 text-[#707070]">{status.name}</span>
            <span>{status.description}</span>
          </li>
        )
      })}
    </ul>
  )
}
