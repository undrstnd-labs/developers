"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useFormStatus } from "react-dom"

import { AuthDetailsType } from "@/types/auth"

import { toast } from "@/hooks/use-toast"

import { Icons } from "@/components/shared/icons"
import { Input } from "@/components/ui/input"

import { isBanned } from "@/actions/user"

function SubmitButton() {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <div className="absolute right-0 top-1">
        <Icons.spinner className="absolute right-2 top-2.5 mr-3 size-4 animate-spin text-base" />
      </div>
    )
  }

  return (
    <button
      type="submit"
      className="absolute right-2 top-2 z-10 h-7 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
    >
      <Icons.chevronRight className="size-4 stroke-[3px]" />
    </button>
  )
}

export function AuthEmail({ data }: { data: AuthDetailsType }) {
  const router = useRouter()

  return (
    <div className="flex justify-center">
      <form
        className="w-[95%]"
        action={async (formData) => {
          const email = formData.get("email") as string

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
              callbackUrl: `/onboarding?name=${data.name}&type=${data.type}`,
            })

            router.push(
              `/otp-code/${email.toLowerCase()}?name=${data.name}&type=${data.type}`
            )
            return toast({
              title: "Please check your inbox",
              description: "We've sent you a link to sign in",
            })
          } catch (error) {
            return toast({
              title: "Erreur",
              variant: "destructive",
            })
          }
        }}
      >
        <fieldset className="relative">
          <Input
            placeholder="email@example.com"
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            aria-label="Email address"
            required
          />
          <SubmitButton />
        </fieldset>
      </form>
    </div>
  )
}
