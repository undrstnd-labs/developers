"use client"

import React from "react"
import { signOut } from "next-auth/react"

export function SiteSignoutButton() {
  return (
    <button className="w-full" onClick={() => signOut()}>
      Logout
    </button>
  )
}
