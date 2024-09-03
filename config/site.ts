import { AnnouncementBannerProps, SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Undrstnd Developers",
  description: "Easy AI integration for devs.",
  url: "https://dev.undrstnd-labs.com",
  images: {
    default: "https://dev.undrstnd-labs.com/og.png",
    notFound: "https://dev.undrstnd-labs.com/not-found.png",
    logo: "https://emojicdn.elk.sh/⏩?style=twitter",
  },
  links: {
    twitter: "https://twitter.com/foundmalek",
    github: "https://github.com/findmalek/findplate",
    discord: "https://discord.gg/uF4bynbKnH",
  },
  author: [
    {
      name: "findmalek",
      url: "https://www.findmalek.com",
      email: "hi@findmalek.com",
      github: "https://github.com/FindMalek",
    },
    {
      name: "Denis Cartin",
      url: "https://www.linkedin.com/in/denis-cartin-3127581b1",
      email: "denis@undrstnd-labs.com",
      github: "https://github.com/deniscartin",
    },
  ],
  agency: {
    name: "Undrstnd Labs",
    url: "https://undrstnd-labs.com",
    email: "info@undrstnd-labs.com",
    github: "https://github.com/undrstnd-labs",
  },
  keywords: ["undrstnd", "developers", "ai", "integration", "easy", "devs"],
}

export const news: AnnouncementBannerProps = {
  overview: "Don't worry, I'm the fastest and cheapest",
  url: "/",
}
