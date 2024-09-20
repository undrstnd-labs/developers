"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { APIToken } from "@prisma/client"
import { useFormStatus } from "react-dom"

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

import { updateKey } from "@/actions/key"

export function DashboardApiKeyEdit({
  token,
  userId,
}: {
  token: APIToken
  userId: string
}) {
  const router = useRouter()
  const { pending } = useFormStatus()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={() => {
          setIsOpen(true)
        }}
        className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-secondary focus:bg-accent focus:text-accent-foreground"
      >
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit API Key</DialogTitle>
          <DialogDescription>
            Enter a display name for the key and click &quot;Save&quot; to
            update it.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4 py-4"
          action={async (formData) => {
            const apikey_name = formData.get("apikey-name") as string

            try {
              await updateKey(userId, token.id, {
                name: apikey_name,
              })
              router.refresh()
              setIsOpen(false)
            } catch (error) {
              console.log(error)
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
                defaultValue={token.name as string}
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
              <Button type="submit" disabled={pending}>
                {pending && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  )
}
