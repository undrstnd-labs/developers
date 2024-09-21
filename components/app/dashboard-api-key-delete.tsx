"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { APIToken } from "@prisma/client"

import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
            disabled={isLoading}
            variant={"destructive"}
            onClick={async () => {
              setIsLoading(true)
              try {
                await deleteKey(userId, token.id)
                router.refresh()
              } catch (error) {
                return toast({
                  title: "Error",
                  description: "Cannot perform action",
                  variant: "destructive",
                })
              } finally {
                setIsLoading(false)
                setIsOpen(false)
              }
            }}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
