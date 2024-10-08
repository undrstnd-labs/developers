"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { authUserEmailSchema as userAuthSchema } from "@/config/validation"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

import { GithubSignIn } from "@/components/shared/github-sign-in"
import { GoogleSignIn } from "@/components/shared/google-sign-in"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { isBanned, isRegisteredUser } from "@/actions/user"

export function AuthUserEmail() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] =
    React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof userAuthSchema>) {
    setIsLoading(true)

    const isUserExist = await isRegisteredUser(data.email)
    if (!isUserExist) {
      return toast({
        title: "You haven't registered you're account",
        variant: "destructive",
        action: (
          <Link href="/register" className={buttonVariants()}>
            Register an account
          </Link>
        ),
      })
    }

    try {
      if (await isBanned(data.email)) {
        return toast({
          title: "Your account is banned",
          variant: "destructive",
        })
      }

      await signIn("email", {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: "/dashboard",
      })

      router.push("/otp-code/" + data.email.toLowerCase())
      return toast({
        title: "Check your email",
        description: "A magic link and OTP code have been sent",
      })
    } catch (error) {
      return toast({
        title: "Erreur",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading || isFacebookLoading}
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Continuer
              <Icons.chevronRight className="ml-2 size-4 stroke-[3px]" />
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              ou continuer avec
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <GoogleSignIn type="login" />
          <GithubSignIn type="login" />
        </div>
      </div>
    </Form>
  )
}
