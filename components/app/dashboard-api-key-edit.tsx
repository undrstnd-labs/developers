"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { APIToken } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { apiTokenSchema } from "@/config/validation"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateKey } from "@/actions/key"

export function DashboardApiKeyEdit({
  token,
  userId,
}: {
  token: APIToken
  userId: string
}) {
  const router = useRouter()
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof apiTokenSchema>>({
    resolver: zodResolver(apiTokenSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof apiTokenSchema>) {
    setLoading(true)

    try {
      await updateKey(userId, token.id, {
        name: values.name,
      })
      router.refresh()
    } catch (error) {
      console.log(error)
      return toast({
        title: "Error",
        description: "Cannot perform this actions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for the API token"
                      autoComplete="apikey-name"
                      defaultValue={token.name as string}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
