import React from "react"

import { AuthDetailsType } from "@/types/auth"

import { FacebookSignIn } from "@/components/shared/facebook-sign-in"
import { GoogleSignIn } from "@/components/shared/google-sign-in"
import { InstagramSignIn } from "@/components/shared/instagram-sign-in"
import { TikTokSignIn } from "@/components/shared/tiktok-sign-in"

export function AuthRegisterProviders({ data }: { data: AuthDetailsType }) {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <GoogleSignIn data={data} />
      <FacebookSignIn />
      <InstagramSignIn />
      <TikTokSignIn />
    </div>
  )
}
