/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "avatar.vercel.sh",
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
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "dev.undrstnd-labs.com",
      },
    ],
    domains: ["localhost"],
  },
}

export default nextConfig
