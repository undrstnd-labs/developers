import { Metadata } from "next"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"

import { env } from "@/env.mjs"
import { Model } from "@/types/model"

import { models } from "@/config/models"
import { siteConfig } from "@/config/site"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAPIToken() {
  return `udsk_${Math.random().toString(36).substring(2)}`
}

export function generateDataSourceId() {
  return `udds_${Math.random().toString(36).substring(2)}`
}

export function getModel(modelId: string): Model {
  return models.find((model) => model.id === modelId && model.active)!
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  return new Intl.DateTimeFormat("en-US", options).format(date)
}

export function generateUUID(): string {
  return uuidv4()
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string
  description?: string
  image?: string
  [key: string]: Metadata[keyof Metadata]
}): Metadata {
  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.author,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicons/favicon-16x16.png",
      apple: "/favicons/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url),
    ...props,
  }
}
