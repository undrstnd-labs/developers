"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { APIToken, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { apiTokenSchema } from "@/config/validation"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
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

import { createKey, getKeys } from "@/actions/key"

export function DashboardApiKeyCreate({
  user,
  length,
}: {
  user: User
  length: number
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [token, setToken] = useState<APIToken | null>(null)

  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  const form = useForm<z.infer<typeof apiTokenSchema>>({
    resolver: zodResolver(apiTokenSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof apiTokenSchema>) {
    setLoading(true)
    const keys = (await getKeys(user.id)).filter((key) => !key.deletedAt)

    if (keys.length >= 3) {
      setLoading(false)
      return toast({
        title: "API Key Limit",
        description: "You have reached the maximum number of keys.",
        variant: "destructive",
      })
    }

    try {
      const key = await createKey(user.id, values.name)
      setToken(key)
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
    }
  }

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
                  disabled={loading}
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
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
