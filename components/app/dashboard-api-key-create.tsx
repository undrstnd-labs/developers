"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { APIToken, User } from "@prisma/client"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { createKey } from "@/actions/key"

export function DashboardApiKeyCreate({
  user,
  length,
}: {
  user: User
  length: number
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState<APIToken | null>(null)

  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: "sm",
        })}
        disabled={length >= 3}
        onClick={() => {
          setToken(null)
        }}
      >
        Create API Key
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add New API Key</DialogTitle>
          <DialogDescription>
            Enter a name for your new API key.
          </DialogDescription>
        </DialogHeader>
        {token ? (
          <>
            <div className="flex space-x-2">
              <Input
                id="apikey"
                value={token.id}
                readOnly
                aria-label="API Key"
              />
              <Button
                onClick={() => {
                  copyToClipboard(token.id)
                }}
                variant="secondary"
                className="shrink-0"
              >
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </>
        ) : (
          <form
            className="space-y-4 py-4"
            action={async (formData) => {
              setLoading(true)
              const apikey_name = formData.get("apikey-name") as string

              try {
                const key = await createKey(user.id, apikey_name)
                setToken(key)
                router.refresh()
              } catch (error) {
                console.log(error)
              } finally {
                setLoading(false)
              }
            }}
          >
            <fieldset className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="apikey-name"
                  placeholder="Enter a name"
                  name="apikey-name"
                  autoComplete="apikey-name"
                  aria-label="API Key Name"
                  required
                />
              </div>
              <DialogFooter>
                <DialogClose
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Cancel
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                  )}
                  Continue
                </Button>
              </DialogFooter>
            </fieldset>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
