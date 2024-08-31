import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./lib/i18n.ts")
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "avatars.jakerunzer.com",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "github.com",
      },
    ],
    domains: ["localhost"],
  },
}

export default withNextIntl(nextConfig)
