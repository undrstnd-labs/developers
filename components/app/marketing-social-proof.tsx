import React from "react"
import Link from "next/link"
import { models } from "@/data/models"

import { Marquee } from "@/components/fancy/marquee"

export function MarketingSocialProof() {
  const companies = models.filter(
    (model, index, self) =>
      self.findIndex((m) => m.company === model.company) === index
  )

  return (
    <div className="bg-background relative flex w-full flex-col items-center justify-center overflow-hidden md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {companies.map((company) => (
          <Link
            href={company.href}
            key={company.label}
            className="flex items-center space-x-1 px-4"
          >
            <company.image className="size-8" />
            <p className="text-muted-foreground text-lg font-semibold">
              {company.company}
            </p>
          </Link>
        ))}
      </Marquee>

      <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
      <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
    </div>
  )
}
