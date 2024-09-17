import { redirect } from "next/navigation"

import { getAuthedUser } from "@/actions/session"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getAuthedUser()

  if (user && user.verified) {
    return redirect("/dashboard")
  }

  return (
    <main className="bg-background min-h-screen font-sans antialiased">
      {children}
    </main>
  )
}
