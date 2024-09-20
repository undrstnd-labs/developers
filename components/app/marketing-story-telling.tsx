import React from "react"
import Image from "next/image"

import { Icons } from "@/components/shared/icons"

export function MarketingStoryTelling() {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Seamless Integration with Our AI-Powered Solutions
              </h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">
                Our platform offers a range of integration options to make it
                easy for developers to incorporate our AI-powered solutions into
                their applications.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            alt=""
            src="/marketing/story-telling.png"
            className="w-[48rem] max-w-none rounded-xl bg-secondary-foreground shadow-xl ring-1 ring-secondary-foreground/10 grayscale sm:w-[57rem]"
            width={1860}
            height={862}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-secondary-foreground/70 lg:max-w-lg">
              <p>
                Whether you&apos;re building a web application, a mobile app, or
                an IoT device, our platform provides the tools and resources you
                need to integrate our AI-powered solutions seamlessly.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-muted-foreground">
                <li className="flex gap-x-3">
                  <Icons.cloud
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-primary"
                  />
                  <span>
                    <strong className="font-semibold text-muted-foreground">
                      API Integration
                    </strong>{" "}
                    Our platform exposes a RESTful API that allows developers to
                    easily integrate our AI-powered solutions into their
                    applications. With our API, you can access a wide range of
                    AI capabilities, including natural language processing,
                    computer vision, and speech recognition.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Icons.code
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-primary"
                  />
                  <span>
                    <strong className="font-semibold text-muted-foreground">
                      SDK Integration
                    </strong>{" "}
                    In addition to our API, we also provide SDKs for popular
                    programming languages, including Python, Java, and
                    JavaScript. Our SDKs make it easy to integrate our
                    AI-powered solutions into your applications, without having
                    to worry about the underlying implementation details.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Whether you&apos;re a seasoned developer or just getting
                started, our platform provides the tools and resources you need
                to integrate our AI-powered solutions into your applications
                quickly and easily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
