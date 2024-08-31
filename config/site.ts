import { SiteConfig } from "types"

export const siteConfig: SiteConfig = {
  name: "FindPlate",
  description: "Suitable for any kind of web development project.",
  url: "https://plate.findmalek.com",
  images: {
    default: "https://plate.findmalek.com/og.png",
    notFound: "https://plate.findmalek.com/not-found.png",
    logo: "https://emojicdn.elk.sh/⏩?style=twitter",
  },
  links: {
    twitter: "https://twitter.com/foundmalek",
    github: "https://github.com/findmalek/findplate",
    discord: "https://discord.gg/uF4bynbKnH",
  },
  author: {
    name: "findmalek",
    url: "https://www.findmalek.com",
    email: "hi@findmalek.com",
    github: "https://github.com/FindMalek",
  },
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Boilerplate",
    "NextAuth.js",
    "Prisma",
    "TypeScript",
    "Markdown",
    "MDX",
    "Internationalization",
    "SEO",
  ],
}

export const notFoundMetadata = (t: (key: string) => string) => {
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: `${siteConfig.name} | ${t("title")}`,
      description: t("description"),
      images: [
        {
          url: siteConfig.images.notFound,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${t("title")}`,
      description: siteConfig.description,
      images: [siteConfig.images.notFound],
      creator: "@findmalek",
    },
  }
}
