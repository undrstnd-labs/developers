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

export type Author = {
  name: string
  url: string
  email: string
  github: string
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
    discord?: string
  }
  images: {
    default: string
    notFound: string
    logo: string
  }
  author: Author[]
  agency?: {
    name: string
    url: string
    email: string
    github: string
  }
  keywords: string[]
}

export type AnnouncementBannerProps = {
  overview: string
  url: string
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

export type accordianItemType = {
  title: string
  href?: string
  links: userNavLink[]
}

export type userNavLink = {
  name: string
  icon: (typeof Icons)[keyof typeof Icons]
  href: string
  hide?: boolean
  active?: boolean
}

export type AnimatedBadgeProps = {
  title: string
  href: string
}

export type Model = {
  label: string
  value: string
  company: string
  href: string
  image: (typeof Icons)[keyof typeof Icons]
}
