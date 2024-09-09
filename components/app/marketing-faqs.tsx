import { faqs } from "@/data/faqs"

import { siteConfig } from "@/config/site"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export async function MarketingFAQs() {
  return (
    <section id="faq" className="py-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary-foreground mt-6 text-xl leading-8">
            Here are some of the most frequently asked questions about our
            services.
          </p>
        </div>
        <div className="container mx-auto my-12 max-w-[600px] space-y-12">
          {faqs.map((faq, idx) => (
            <section key={idx} id={"faq-" + faq.section}>
              <h2 className="text-foreground/60 mb-4 text-left text-base font-semibold tracking-tight">
                {faq.section}
              </h2>
              <Accordion
                type="single"
                collapsible
                className="flex w-full flex-col items-center justify-center text-left"
              >
                {faq.qa.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={faq.question}
                    className="w-full max-w-[600px]"
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-left">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
        <h4 className="text-foreground/80 mb-12 text-center text-sm font-medium tracking-tight">
          If you have any other questions, feel free to reach out to us at{" "}
          <a href={"mailto:" + siteConfig.agency?.email} className="underline">
            {siteConfig.agency?.email}
          </a>
        </h4>
      </div>
    </section>
  )
}
