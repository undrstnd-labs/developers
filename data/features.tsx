import { MarketingAboutAnalytics } from "@/components/app/marketing-about-analytics"
import { MarketingAboutAuth } from "@/components/app/marketing-about-auth"
import { MarketingAboutBlogs } from "@/components/app/marketing-about-blogs"
import { MarketingAboutComponents } from "@/components/app/marketing-about-components"
import { MarketingAboutMarquee } from "@/components/app/marketing-about-marquee"
import { MarketingAboutSeo } from "@/components/app/marketing-about-seo"
import { EvervaultCard } from "@/components/fancy/evervault-card"
import { Globe } from "@/components/fancy/globe"
import { Icons } from "@/components/shared/icons"

export const features = (t: (arg: string) => string) => [
  {
    Icon: Icons.lock,
    name: t("features.f-1.title"),
    description: t("features.f-1.description"),
    href: "https://next-auth.js.org",
    cta: t("learn-more"),
    className: "col-span-3 lg:col-span-1",
    background: (
      <MarketingAboutAuth className="absolute left-1/2 h-[300px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.graph,
    name: t("features.f-2.title"),
    description: t("features.f-2.description"),
    className: "col-span-3 lg:col-span-1",
    href: "https://logsnag.com",
    cta: t("learn-more"),
    background: (
      <MarketingAboutAnalytics className="absolute left-1/2 h-[300px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.mail,
    name: t("features.f-3.title"),
    description: t("features.f-3.description"),
    href: "https://nodemailer.com",
    cta: t("learn-more"),
    className: "col-span-3 lg:col-span-1 row-span-1 lg:row-span-2",
    background: (
      <MarketingAboutMarquee className="absolute left-1/2 h-[600px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.puzzle,
    name: t("features.f-4.title"),
    description: t("features.f-4.description"),
    href: "/upcoming",
    cta: t("learn-more"),
    className: "col-span-3 lg:col-span-1",
    background: (
      <MarketingAboutComponents className="absolute left-1/2 h-[200px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.databaseZap,
    name: t("features.f-5.title"),
    description: t("features.f-5.description"),
    className: "col-span-3 lg:col-span-1",
    href: "https://www.prisma.io/nextjs",
    cta: t("learn-more"),
    background: (
      <EvervaultCard className="absolute left-1/2 h-[200px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
        <Icons.prisma className="size-16" />
      </EvervaultCard>
    ),
  },
  {
    Icon: Icons.globe,
    name: t("features.f-6.title"),
    description: t("features.f-6.description"),
    className: "col-span-3 lg:col-span-2",
    href: "https://next-intl-docs.vercel.app/",
    cta: t("learn-more"),
    background: (
      <Globe className="absolute left-1/2 h-[300px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.blog,
    name: t("features.f-7.title"),
    description: t("features.f-7.description"),
    className: "col-span-3 lg:col-span-1",
    href: "/post",
    cta: t("learn-more"),
    background: (
      <MarketingAboutBlogs className="absolute left-1/2 h-[300px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.zap,
    name: t("features.f-8.title"),
    description: t("features.f-8.description"),
    className: "col-span-3 lg:col-span-1",
    href: "https://imgsrc.io/tools",
    cta: t("learn-more"),
    background: (
      <MarketingAboutSeo className="absolute left-1/2 h-[300px] max-w-md -translate-x-1/2 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Icons.copy,
    name: t("features.f-9.title"),
    description: t("features.f-9.description"),
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: t("learn-more"),
    background: (
      <>
        Easily add and manage content with a built-in blogging system, complete
        with Markdown support for rich text formatting.
      </>
    ),
  },
  {
    Icon: Icons.toggleRight,
    name: t("features.f-10.title"),
    description: t("features.f-10.description"),
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: t("learn-more"),
    background: (
      <>
        Easily add and manage content with a built-in blogging system, complete
        with Markdown support for rich text formatting.
      </>
    ),
  },
]
