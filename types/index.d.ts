import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/shared/icons"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter?: string
    github?: string
    discord?: string
  }
  images: {
    default: string
    notFound: string
    logo: string
  }
  author: {
    name: string
    url: string
    email: string
    github?: string
  }
  keywords: string[]
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export interface Status {
  name: string
  description: string
}

export type ListItemProps = {
  title: string
  href: string
  external?: boolean
  icon: () => React.JSX.Element
  className?: string
}

export type NavLink = {
  name: string
  title: string
  path: string
}
