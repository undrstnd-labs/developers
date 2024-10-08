"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

import { FlickeringGrid } from "@/components/fancy/flickering-grid"
import { Ripple } from "@/components/fancy/ripple"
import { Safari } from "@/components/fancy/safari"
import { Section } from "@/components/ui/section"

import { MarketingSolutionChart } from "@/components/app/marketing-solution-chart"
import { NumberTicker } from "@/components/fancy/number-ticker"

const features = [
    {
        title: "Fast AI Inference",
        description:
            "Experience incredibly fast AI inference times, up to 20x faster than GPT-4o and other leading models.",
        className: "hover:bg-yellow-500/10 transition-all duration-500 ease-out",
        content: (
            <MarketingSolutionChart />
        ),
    },
    {
        title: "Affordable Pricing",
        description:
            "Our cost-effective AI services are designed to be up to 70x cheaper than traditional providers like OpenAI.",
        className: "hover:bg-green-500/10 transition-all duration-500 ease-out",
        content: (
            <div className="flex h-3/5 items-center justify-center">
                <div className="text-7xl font-semibold text-primary">
                    -
                    <NumberTicker
                        value={70}
                        direction="up"
                        className="text-8xl font-semibold text-primary"
                    />%
                </div>
            </div>
        ),
    },
    {
        title: "Data Source Integration",
        description:
            "Upload your own datasets and train models in under a minute with our easy-to-use Data Source feature.",
        className:
            "md:row-span-2 hover:bg-blue-500/10 transition-all duration-500 ease-out",
        content: (
            <>
                <FlickeringGrid
                    className="absolute inset-0 z-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
                    squareSize={4}
                    gridGap={6}
                    color="#000"
                    maxOpacity={0.1}
                    flickerChance={0.1}
                    height={800}
                    width={800}
                />
                <Safari
                    src={`/data-source.png`}
                    url="https://dev.undrstnd-labs.com/data-source"
                    className="-mb-48 ml-12 mt-16 h-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-x-[-10px]"
                />
            </>
        ),
    },
    {
        title: "LLM Variety",
        description:
            "Choose from a variety of open-source LLMs to fit your specific needs, all backed by powerful, flexible APIs.",
        className:
            "flex-row md:col-span-2 md:flex-row xl:order-none hover:bg-purple-500/10 transition-all duration-500 ease-out",
        content: (
            <>
                <Ripple className="absolute -bottom-full" />
                <Safari
                    src={`/llm-options.png`}
                    url="https://dev.undrstnd-labs.com/models"
                    className="-mb-32 mt-4 max-h-64 w-full select-none px-4 drop-shadow-[0_0_28px_rgba(0,0,0,.1)] transition-all duration-300 group-hover:translate-y-[-10px]"
                />
            </>
        ),
    },
]

export function MarketingSolution() {
    return (
        <Section
            title="Solution"
            subtitle="One Platform, One API, Infinite Possibilities"
            description="Empowers developers and businesses to build AI-powered applications with just 4 lines of code."
            className="bg-neutral-100 dark:bg-neutral-900"
        >
            <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3 xl:grid-rows-2">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "group relative items-start overflow-hidden rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-800",
                            feature.className
                        )}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100,
                            damping: 30,
                            delay: index * 0.1,
                        }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h3 className="mb-2 font-semibold text-primary">
                                {feature.title}
                            </h3>
                            <p className="text-foreground">{feature.description}</p>
                        </div>
                        {feature.content}
                        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900"></div>
                    </motion.div>
                ))}
            </div>
        </Section>
    )
}
