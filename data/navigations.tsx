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
    name: "Usage",
    icon: Icons.chart,
    href: "/dashboard/usage",
  },
  {
    name: "Logs",
    icon: Icons.logs,
    href: "/dashboard/logs",
  },
  {
    name: "Support",
    icon: Icons.settings,
    href: "mailto:info@undrstnd-labs.com",
  },
]
