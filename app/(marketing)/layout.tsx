import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

import { AI } from "@/actions/chat"
import { getAuthedUser } from "@/actions/session"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getAuthedUser()

  return (
    <AI>
      <SiteHeader user={user} />
      {children}
      <SiteFooter />
    </AI>
  )
}
