import Link from "next/link"
import { redirect } from "next/navigation"
import { z } from "zod"

import { cn } from "@/lib/utils"

import { AuthOTPCode } from "@/components/app/auth-otp-code"
import { AuthResend } from "@/components/app/auth-resend"
import { Icons } from "@/components/shared/icons"
import { buttonVariants } from "@/components/ui/button"

export default async function OTPCodePage({
  params: { email },
  searchParams,
}: {
  params: { email: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  if (!z.string().email().safeParse(decodeURIComponent(email)).success) {
    return redirect("/login")
  }

  console.log(searchParams)

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        Return
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Icons.logo className="mx-auto size-10" />
        <AuthOTPCode email={decodeURIComponent(email)} />
        <AuthResend
          email={decodeURIComponent(email)}
          searchParams={searchParams}
        />
      </div>
    </div>
  )
}
