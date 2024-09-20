import React, { useState } from "react"
import { signIn } from "next-auth/react"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

export function TikTokSignIn() {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    // signIn("TikTok")
    setLoading(false)
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled
      className="flex h-[40px] w-full space-x-2 bg-primary px-6 py-4 font-medium text-secondary active:scale-[0.98]"
    >
      {isLoading ? (
        <Icons.spinner className="size-4 animate-spin" />
      ) : (
        <>
          <Icons.tiktok />
          <span>Continue with TikTok</span>
        </>
      )}
    </Button>
  )
}
