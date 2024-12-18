"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function MarketingHeroInstall() {
  const { isCopied, copyToClipboard } = useCopyToClipboard({})

  return (
    <div className="group flex items-center justify-center space-x-3">
      <div className="group flex flex-col">
        <p
          className={cn(
            "duration-time font-mono leading-tight transition-opacity",
            isCopied ? "text-primary" : "text-muted-foreground"
          )}
        >
          $ ~ <span className="text-muted-foreground">npm</span> install
          @ai-sdk/openai
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="duration-time opacity-0 transition-opacity group-hover:opacity-100"
          >
            {isCopied ? (
              <Icons.check className="size-4 text-primary" />
            ) : (
              <Icons.copy className="size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuItem
            onClick={() => copyToClipboard("npm install @ai-sdk/openai")}
          >
            npm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("yarn add @ai-sdk/openai")}
          >
            yarn
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("pnpm install @ai-sdk/openai")}
          >
            pnpm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("bun install @ai-sdk/openai")}
          >
            bun
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
