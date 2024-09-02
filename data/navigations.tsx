import { accordianItemType, userNavLink } from "types"

import { Icons } from "@/components/shared/icons"

// TODO: Complete page creation
// TODO: Add icons
export const navMobileLinks: accordianItemType[] = [
  {
    title: "Services",
    links: [
      {
        name: "Réservation de Voitures",
        icon: Icons.car,
        href: "/services/cars",
      },
      {
        name: "Chauffeurs Privés",
        icon: Icons.driver,
        href: "/services/private-drivers",
      },
      {
        name: "Location Long Terme",
        icon: Icons.calendarClock,
        href: "/services/long-term-rental",
      },
      {
        name: "Voitures Commerciales",
        icon: Icons.truck,
        href: "/services/commercial-vehicles",
      },
    ],
  },
  {
    title: "Solutions",
    links: [
      {
        name: "Pour les Entreprises",
        icon: Icons.entreprise,
        href: "/solutions/business",
      },
      {
        name: "Pour les Touristes",
        icon: Icons.map,
        href: "/solutions/tourists",
      },
      {
        name: "Pour les Événements",
        icon: Icons.ticket,
        href: "/solutions/events",
      },
      {
        name: "Pour les Familles",
        icon: Icons.family,
        href: "/solutions/families",
      },
      {
        name: "Location avec Chauffeur",
        icon: Icons.bellhop,
        href: "/solutions/with-driver",
      },
    ],
  },
  {
    title: "Promotions",
    links: [
      {
        name: "Offre Week-end",
        icon: Icons.beach,
        href: "/promotions/weekend",
        active: true,
      },
      {
        name: "Bons Plans",
        icon: Icons.handshake,
        href: "/promotions/great-deals",
        active: true,
      },
      {
        name: "Offre Réveillon",
        icon: Icons.party,
        href: "/promotions/new-year",
        hide: true,
      },
      {
        name: "Offres Saisonnales",
        icon: Icons.leaf,
        href: "/promotions/seasonal",
      },
      {
        name: "Bons Plans",
        icon: Icons.handshake,
        href: "/promotions/great-deals",
      },
    ],
  },
  {
    title: "Support",
    href: "/contact",
    links: [],
  },
  {
    title: "À Propos",
    href: "/about",
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
