import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn, constructMetadata } from "@/lib/utils"

import { AuthRegister } from "@/components/app/auth-register"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"

import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: `Create an account`,
  description: `Create an account on ${siteConfig.name} to get started.`,
})

export default async function RegisterPage() {
  const user = await getAuthedUser()

  if (user && !user.verified) {
    return redirect("/dashboard")
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center overflow-x-hidden lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <div className="absolute inset-0" />
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative z-20 flex w-fit items-center text-lg font-semibold"
          )}
        >
          <Icons.logo className="mr-2 size-6" />
          {siteConfig.name}
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo; By developers for developers. &rdquo;
            </p>
            <footer className="text-sm">@findmalek</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Icons.logo className="mx-auto size-10" />

          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account on {siteConfig.name}
            </h1>

            <AuthRegister />
            <p className="text-xs text-secondary-foreground/65">
              By clicking continue, you agree to our{" "}
              <Link href="/post/terms" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/post/policy" className="underline">
                {" "}
                Privacy Policy.
              </Link>{" "}
              of {siteConfig.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
