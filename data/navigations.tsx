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
