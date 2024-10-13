import { NextResponse } from "next/server"

import { ErrorResponse } from "@/types/model"

import { siteConfig } from "@/config/site"

export function getErrorResponse({
  status,
  req_token,
  modelId,
  message,
}: ErrorResponse) {
  let error = {}

  switch (status) {
    case 400:
      error = {
        code: 400,
        message: "Bad Request",
        solution: `Please check the parameters in your API call. ${message}`,
      }
      break
    case 401:
      error = {
        code: 401,
        message: "Invalid Authentication",
        solution: `Your API Key ${`${req_token.slice(0, 5)}...${req_token.slice(-5)}`} is invalid. Please ensure the correct API key or get a new one from the dashboard ${siteConfig.url}/dashboard/api-keys.`,
      }
      break
    case 403:
      error = {
        code: 403,
        message: "Country, region, or territory not supported",
        solution: "Please see this page for more information.",
      }
      break
    case 429:
      error = {
        code: 429,
        message: "Rate limit reached for your API Key",
        solution: `Pace your requests. Checkout our docs ${siteConfig.url}/docs.`,
      }
      break
    case 500:
      error = {
        code: 500,
        message: "The server had an error while processing your request",
        solution: `Retry your request after a brief wait and contact us if the issue persists. Check the status page ${siteConfig.url}/status.`,
      }
      break
    case 503:
      error = {
        code: 503,
        message: "The engine is currently overloaded, please try again later",
        solution: "Please retry your requests after a brief wait.",
      }
      break
    case 402:
      error = {
        code: 402,
        message: "Insufficient funding",
        solution: `Please add more funding to your account. You can do this on the dashboard ${siteConfig.url}/dashboard/billing.`,
      }
      break
    default:
      error = {
        code: 500,
        message: "An unexpected error occurred",
        solution: "Please contact us for assistance.",
      }
  }

  return new NextResponse(JSON.stringify({ error }), {
    status: status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      "x-api-key-used": req_token,
      "x-api-key-valid": "false",
      "x-undrstnd": "v0",
      "x-url-docs": `${siteConfig.url}/docs`,
      "x-url-api-keys": `${siteConfig.url}/dashboard/api-keys`,
      "x-model-id": modelId || "unknown",
    },
  })
}

export function generateId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = "udsk_"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
