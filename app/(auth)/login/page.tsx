import Link from "next/link"
import { redirect } from "next/navigation"

import { cn } from "@/lib/utils"

import { AuthUserEmail } from "@/components/app/auth-user-email"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"

import { getAuthedUser } from "@/actions/session"

export function generateMetadata() {
  return {
    title: "Login to your account",
    description:
      "Login to your account to access all the features and functionality.",
  }
}

export default async function LoginPage() {
  const user = await getAuthedUser()

  if (user && !user.verified) {
    return redirect("/dashboard")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Back
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Icons.logo className="mx-auto size-10" />

        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to your account to access all the features and functionality.
          </p>

          <AuthUserEmail />
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
