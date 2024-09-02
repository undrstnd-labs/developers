import React, { useState } from "react"
import { signIn } from "next-auth/react"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"

export function InstagramSignIn() {
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    // signIn("Instagram")
    setLoading(false)
  }

  return (
    <Button
      onClick={handleSignIn}
      className="bg-primary text-secondary flex h-[40px] w-full space-x-2 px-6 py-4 font-medium active:scale-[0.98]"
    >
      {isLoading ? (
        <Icons.spinner className="size-4 animate-spin" />
      ) : (
        <>
          <Icons.instagram />
          <span>Continue avec Instagram</span>
        </>
      )}
    </Button>
  )
}
