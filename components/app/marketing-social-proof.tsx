import React from "react"
import Link from "next/link"
import { models } from "@/data/models"
import { partnerships } from "@/data/partnerships"

import { Marquee } from "@/components/fancy/marquee"

export function MarketingSocialProof() {
  const companies = models.filter(
    (model, index, self) =>
      self.findIndex((m) => m.company === model.company) === index
  )

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:40s]">
        {[...companies, ...partnerships].map((company) => (
          <Link
            href={company.href}
            key={company.label}
            className="flex items-center space-x-1 px-2 sm:px-4"
          >
            <company.image className="size-8" />
            <p className="text-lg font-semibold text-muted-foreground">
              {company.company}
            </p>
          </Link>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
