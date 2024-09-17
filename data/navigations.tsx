import { accordianItemType, userNavLink } from "types"

import { Icons } from "@/components/shared/icons"

export const navMobileLinks: accordianItemType[] = [
  {
    title: "Documentation",
    href: "https://docs.undrstnd-labs.com/",
    links: [],
  },
]

export const navUserLinks: userNavLink[] = [
  {
    name: "Tableau de bord",
    icon: Icons.dashboard,
    href: "/settings",
  },
  {
    name: "Profile",
    icon: Icons.user,
    href: "/account",
  },
]

export const navDashboardLinks: userNavLink[] = [
  {
    name: "Dashboard",
    icon: Icons.dashboard,
    href: "/dashboard",
  },
  {
    name: "API Keys",
    icon: Icons.key,
    href: "/dashboard/api-keys",
  },
  {
    name: "Data Sources",
    icon: Icons.database,
    href: "/dashboard/data-sources",
  },
  {
    name: "Usage",
    icon: Icons.chart,
    href: "/dashboard/usage",
  },
  {
    name: "Support",
    icon: Icons.support,
    href: "mailto:info@undrstnd-labs.com",
  },
]
