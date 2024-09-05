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
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "cdn-avatars.huggingface.co",
      },
    ],
    domains: ["localhost"],
  },
}

export default nextConfig
