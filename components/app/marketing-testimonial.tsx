import React from "react"

import { Icons } from "@/components/shared/icons"

export function MarketingTestimonial() {
  return (
    <section className="bg-secondary px-6 py-24 sm:py-12 lg:px-8">
      <figure className="mx-auto max-w-7xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 stroke-transparent">
          <Icons.star
            className="size-7 flex-none fill-yellow-400 stroke-transparent"
            aria-hidden="true"
          />
          <Icons.star
            className="size-7 flex-none fill-yellow-400 stroke-transparent"
            aria-hidden="true"
          />
          <Icons.star
            className="size-7 flex-none fill-yellow-400 stroke-transparent"
            aria-hidden="true"
          />
          <Icons.star
            className="size-7 flex-none fill-yellow-400 stroke-transparent"
            aria-hidden="true"
          />
          <Icons.star
            className="size-7 flex-none fill-yellow-400 stroke-transparent"
            aria-hidden="true"
          />
        </div>
        <blockquote className="mt-10 text-xl font-semibold leading-8 tracking-tight text-secondary-foreground sm:text-2xl sm:leading-9">
          <p>
            “I&apos;m integrating Undrstnd Developers API for business data
            analysis, works great and the models are very fast.”
          </p>
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-x-6">
          <div className="text-sm leading-6">
            <div className="font-semibold text-secondary-foreground">
              Massimiliano Della Sala
            </div>
            <div className="mt-0.5 text-secondary-foreground/70">
              Business Analyst Specialized in Marketing Management
            </div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
