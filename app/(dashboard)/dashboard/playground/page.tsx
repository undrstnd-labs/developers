import React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { constructMetadata } from "@/lib/utils"

import { LLMPlayground } from "@/components/app/dashboard-playground-llm"

import { getKeys } from "@/actions/key"
import { getResources } from "@/actions/resource"
import { getAuthedUser } from "@/actions/session"

export const metadata: Metadata = constructMetadata({
  title: "Playground",
  description:
    "Play around with our API and see how it works. You can test out different queries and see the results in real-time.",
})

export default async function PlaygroundPage() {
  const user = await getAuthedUser()
  if (!user) {
    return redirect("/login")
  }

  const keys = (await getKeys(user.id)).filter((key) => !key.deletedAt)
  const resources = await getResources(user.id)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold md:text-2xl">Playground</h1>
      </div>
      <LLMPlayground keys={keys} resources={resources} />
    </>
  )
}
