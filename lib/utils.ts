import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Model } from "@/types/model"

import { models } from "@/config/models"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAPIToken() {
  return `udsk_${Math.random().toString(36).substring(2)}`
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
