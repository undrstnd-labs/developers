import React from "react"

import { AuthDetailsType } from "@/types/auth"

import { GithubSignIn } from "@/components/shared/github-sign-in"
import { GoogleSignIn } from "@/components/shared/google-sign-in"

export function AuthRegisterProviders({ data }: { data: AuthDetailsType }) {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <GoogleSignIn data={data} type="register" />
      <GithubSignIn data={data} type="register" />
    </div>
  )
}
