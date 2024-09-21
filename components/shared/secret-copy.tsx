"use client"

import React from "react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"

export function SecretCopy({ secret }: { secret: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  return (
    <div className="w-fit flex-1 cursor-pointer truncate rounded-md bg-muted transition-colors duration-200 hover:text-primary-foreground/50">
      <div
        className="flex items-center space-x-2"
        onClick={() => {
          copyToClipboard(secret)
        }}
      >
        <span className="flex w-fit items-center gap-2 px-2 font-mono text-xs">
          {secret.slice(0, 4)}...{secret.slice(-6)}
        </span>
        <button className="rounded-md p-1 transition-colors hover:bg-muted">
          {isCopied ? (
            <Icons.check className="size-4 text-primary" />
          ) : (
            <Icons.copy className="size-4 text-card-foreground" />
          )}
          <span className="sr-only">Copy secret key</span>
        </button>
      </div>
    </div>
  )
}
