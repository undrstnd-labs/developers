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

import { deleteKey } from "@/actions/key"

export function DashboardApiKeyDelete({
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
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your API
            key.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={pending}
            variant={"destructive"}
            onClick={async () => {
              await deleteKey(userId, token.id)
              router.refresh()
              setIsOpen(false)
            }}
          >
            {pending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
