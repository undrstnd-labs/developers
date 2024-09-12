"use client"

import React from "react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// TODO: Copy SDK
export function MarketingHeroInstall() {
  const { isCopied, copyToClipboard } = useCopyToClipboard({})

  return (
    <div className="group flex items-center justify-center space-x-3">
      <div className="group flex flex-col">
        <p className="font-mono leading-tight transition-opacity duration-300 group-hover:hidden group-hover:opacity-0">
          $ ~ <span className="text-muted-foreground">npm</span> install
          @undrstnd/ai-engine
        </p>
        <p className="text-destructive leading-tight opacity-0 transition-opacity duration-300 group-hover:inline group-hover:opacity-100">
          Our SDK is currently under development. Stay tuned for updates!
        </p>
      </div>

      {/*   <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="small-icon"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {isCopied ? (
              <Icons.check className="text-primary size-4" />
            ) : (
              <Icons.copy className="size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          <DropdownMenuItem
            onClick={() => copyToClipboard("npm install @undrstnd/ai-engine")}
          >
            npm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("yarn add @undrstnd/ai-engine")}
          >
            yarn
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("pnpm install @undrstnd/ai-engine")}
          >
            pnpm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => copyToClipboard("bun install @undrstnd/ai-engine")}
          >
            bun
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  )
}
