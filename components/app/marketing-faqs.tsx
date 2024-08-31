import { faqs } from "@/data/faqs"
import { getTranslations } from "next-intl/server"

import { siteConfig } from "@/config/site"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export async function MarketingFAQs() {
  const t = await getTranslations("app.components.app.marketing-faqs")

  return (
    <section id="faq" className="py-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>
          <p className="text-secondary-foreground mt-6 text-xl leading-8">
            {t("description")}
          </p>
        </div>
        <div className="container mx-auto my-12 max-w-[600px] space-y-12">
          {faqs(t).map((faq, idx) => (
            <section key={idx} id={"faq-" + faq.section}>
              <h2 className="text-foreground/60 mb-4 text-left text-base font-semibold tracking-tight">
                {faq.section}
              </h2>
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col items-center justify-center"
              >
                {faq.qa.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={faq.question}
                    className="w-full max-w-[600px]"
                  >
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
        <h4 className="text-foreground/80 mb-12 text-center text-sm font-medium tracking-tight">
          {t("contact")}{" "}
          <a href={"mailto:" + siteConfig.author.email} className="underline">
            {siteConfig.author.email}
          </a>
        </h4>
      </div>
    </section>
  )
}
