import React, { useState } from "react"
import { signIn } from "next-auth/react"

import { AuthDetailsType } from "@/types/auth"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

export function GithubSignIn({
  data,
  type,
}: {
  data?: AuthDetailsType
  type: "login" | "register"
}) {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    signIn("github", {
      redirect: false,
      callbackUrl:
        type === "login"
          ? "/dashboard"
          : `/onboarding?name=${data?.name}&type=${data?.type}`,
    })
    setLoading(false)
  }

  return (
    <Button
      onClick={handleSignIn}
      className="flex h-[40px] w-full space-x-2 bg-primary px-6 py-4 font-medium text-secondary active:scale-[0.98]"
    >
      {isLoading ? (
        <Icons.spinner className="size-4 animate-spin" />
      ) : (
        <>
          <Icons.github />
          <span>Continue with Github</span>
        </>
      )}
    </Button>
  )
}