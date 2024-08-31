import Image from "next/image"

import { cn } from "@/lib/utils"

import { Marquee } from "@/components/fancy/marquee"

const emails = [
  {
    name: "Notion",
    img: "/email/notion-passcode.jpg",
  },
  {
    name: "Primevera",
    img: "/email/primevera-magiclink.jpg",
  },
  {
    name: "Stripe",
    img: "/email/stripe-welcome.jpg",
  },
  {
    name: "Undrstnd",
    img: "/email/undrstnd-invite-classroom.jpg",
  },
  {
    name: "Undrstnd",
    img: "/email/undrstnd-magiclink.jpg",
  },
  {
    name: "Undrstnd",
    img: "/email/undrstnd-welcome.jpg",
  },
]

export function MarketingAboutMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-background relative flex h-full w-96 flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border px-20 md:shadow-xl",
        className
      )}
    >
      <div className="flex flex-row gap-4 [perspective:300px]">
        <Marquee
          className="h-96 justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
        >
          {emails.map((data, idx) => (
            <Image
              key={idx}
              src={data.img}
              alt={data.name}
              className="mx-auto h-full w-3/4 cursor-pointer rounded-xl border border-neutral-300 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
              width={200}
              height={200}
            />
          ))}
        </Marquee>
      </div>

      <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
      <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
    </div>
  )
}
