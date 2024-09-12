"use client"

import React, { useState } from "react"
import { signIn } from "next-auth/react"

import { toast } from "@/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { isBanned } from "@/actions/user"

export function AuthResend({ email }: { email: string }) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Button
      variant={"secondary"}
      className="px-10"
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        try {
          if (await isBanned(email)) {
            return toast({
              title: "Banned account",
              variant: "destructive",
            })
          }

          await signIn("email", {
            email: email.toLowerCase(),
            redirect: false,
            callbackUrl: "/dashboard",
          })

          return toast({
            title: "Please check your inbox",
            description: "We've sent you a link to sign in",
          })
        } catch (error) {
          return toast({
            title: "Erreur",
            variant: "destructive",
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
      Re-send email
    </Button>
  )
}
