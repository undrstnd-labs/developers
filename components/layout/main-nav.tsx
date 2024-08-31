"use client"

import { Link, usePathname } from "@navigation"

import { ListItemProps } from "types"

import { navigationLinks } from "@/config/consts"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { GlowingStarsBackgroundCard } from "@/components/fancy/glowing-stars"
import { Icons } from "@/components/shared/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const components: ListItemProps[] = [
  {
    title: "Documentation",
    href: "https://docs.midday.ai",
    icon: () => <Icons.description size={20} />,
    external: true,
  },
  {
    title: "Open Source",
    href: "https://git.new/midday",
    icon: () => <Icons.github size={19} />,
    external: true,
  },
  {
    title: "Join the community",
    href: "https://go.midday.ai/anPiuRx",
    icon: () => <Icons.discord size={20} />,
    external: true,
  },
  {
    title: "Apps & Integrations",
    href: "https://docs.midday.ai",
    icon: () => <Icons.integrationInstructions size={20} />,
    external: true,
  },
  {
    title: "Engine",
    href: "/engine",
    icon: () => <Icons.memory size={21} />,
  },
]
const ListItem = ({
  className,
  title,
  icon: Icon,
  external,
  ...props
}: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          target={external ? "_blank" : undefined}
          className={cn(
            "hover:bg-secondary focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="flex items-center">
            <div className="w-8">
              <Icon />
            </div>
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="size-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <NavigationMenu>
          <NavigationMenuLink>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground/60 hover:text-foreground/80 mx-0 bg-transparent p-0 font-normal transition-colors hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  Developers
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex">
                  <Link
                    href="/engine"
                    className="border-border border-r-DEFAULT"
                  >
                    <div className="mb-6 w-[215px]">
                      <NavigationMenuLink asChild>
                        <GlowingStarsBackgroundCard>
                          <span className="text-lg font-medium">
                            FindPlate Engine
                          </span>
                          <div className="flex items-end justify-between">
                            <p className="line-clamp-2 text-sm leading-snug text-[#707070]">
                              One API to rule them all. Unlimited connections.
                            </p>
                          </div>
                        </GlowingStarsBackgroundCard>
                      </NavigationMenuLink>
                    </div>
                  </Link>
                  <ul className="flex w-[400px] flex-col p-4">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                        external={component.external}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenuLink>
        </NavigationMenu>
        {navigationLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === link.path ? "text-foreground" : "text-foreground/60"
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
