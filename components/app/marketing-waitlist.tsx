"use client"

import { useState } from "react"
import { useLogSnag } from "@logsnag/next"
import { useTranslations } from "next-intl"
import { useFormStatus } from "react-dom"

import { LogEvents } from "@/config/events"
import { siteConfig } from "@/config/site"
import { toast } from "@/hooks/use-toast"

import { Icons } from "@/components/shared/icons"

import { subscribeAction } from "@/actions/subscribe"

function SubmitButton() {
  const { pending } = useFormStatus()
  const t = useTranslations("app.components.app.marketing-waitlist")

  if (pending) {
    return (
      <div className="absolute right-0 top-1">
        <Icons.spinner className="absolute right-2 top-2.5 mr-3 size-4 animate-spin text-base" />
      </div>
    )
  }

  return (
    <button
      type="submit"
      className="bg-primary text-primary-foreground absolute right-2 top-2 z-10 h-7 rounded-md px-4 text-sm font-medium"
    >
      {t("join")}
    </button>
  )
}

export function MarketingWaitlistForm() {
  const { track } = useLogSnag()
  const [isSubmitted, setSubmitted] = useState(false)
  const t = useTranslations("app.components.app.marketing-waitlist")

  return (
    <div>
      <div className="flex justify-center">
        {isSubmitted ? (
          <div className="font-sm text-primary flex h-11 w-[330px] items-center justify-between rounded-lg border border-[#2C2C2C] px-3 py-1">
            <p>{t("subscribed")}</p>

            <svg
              width="17"
              height="17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check</title>
              <path
                d="m14.546 4.724-8 8-3.667-3.667.94-.94 2.727 2.72 7.06-7.053.94.94Z"
                fill="#fff"
              />
            </svg>
          </div>
        ) : (
          <form
            action={async (formData) => {
              setSubmitted(true)
              const country = await subscribeAction(formData, "whitelist")

              if (!country) {
                toast({
                  title: t("error"),
                  description: t("error-description"),
                  variant: "destructive",
                })
                return
              } else {
                const email = formData.get("email") as string
                track({
                  event: LogEvents.Waitlist.name,
                  notify: true,
                  icon: LogEvents.Waitlist.icon,
                  channel: LogEvents.Waitlist.channel,
                  description: `${email} joined the waitlist for ${siteConfig.name}`,
                  tags: {
                    email,
                    country,
                  },
                })

                toast({
                  title: t("success"),
                  description: t("success-description"),
                })

                setTimeout(() => {
                  setSubmitted(false)
                }, 5000)
              }
            }}
          >
            <fieldset className="relative z-50">
              <input
                placeholder={t("email-placeholder")}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                aria-label="Email address"
                required
                className="font-sm border-border text-primary h-11 w-[360px] rounded-lg border bg-transparent px-3 py-1 outline-none"
              />
              <SubmitButton />
            </fieldset>
          </form>
        )}
      </div>
    </div>
  )
}
