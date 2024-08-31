import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { notFoundMetadata, siteConfig } from "@/config/site"

import { BlurryCircle } from "@/components/fancy/blurry-circle"
import { RenderMarkdown } from "@/components/layout/markdown"
import { PostStatus } from "@/components/shared/post-status"

export async function generateStaticParams({
  params,
}: {
  params: { locale: string }
}) {
  const postSlugs = allPosts
    .filter((post) => post.lang === params.locale)
    .map((about) => about.slugAsParams.replace("post/", ""))

  return postSlugs.map((slug) => ({ name: slug, locale: params.locale }))
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const translatedApp = await getTranslations("app")
  const post = allPosts.find(
    (about) =>
      about.slugAsParams === `post/${params.name}` &&
      about.lang === translatedApp("language")
  )

  const translatedMetadata = await getTranslations("app.pages.not-found")

  if (!post) {
    return notFoundMetadata(translatedMetadata)
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteConfig.url}/post/${post.slug}`,
      images: [
        {
          url: image || siteConfig.images.default,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || siteConfig.images.default],
    },
  }
}

export default async function Page({
  params: { name, locale },
}: {
  params: { name: string; locale: string }
}) {
  unstable_setRequestLocale(locale)
  const translatedApp = await getTranslations("app")

  const post = allPosts.find(
    (about) =>
      about.slugAsParams === `post/${name}` &&
      about.lang === translatedApp("language")
  )

  if (!post) {
    notFound()
  }

  return (
    <div className="container flex max-w-[1140px] justify-center py-4">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.summary,
            image: `${siteConfig.url}${post.image}`,
            url: `${siteConfig.url}/updates/${post.slug}`,
          }),
        }}
      />

      <BlurryCircle className="absolute right-16 top-[40%] -z-10 hidden bg-[#F59F95]/30 md:block dark:bg-[#F59F95]/10" />
      <BlurryCircle className="absolute right-[30%] top-[70%] -z-10 hidden bg-[#3633D0]/5 md:block dark:bg-[#3633D0]/10" />

      <article className="w-full max-w-[680px] pt-[80px] md:pt-[150px]">
        <PostStatus status={post.tag} />

        <h2 className="mb-6 text-2xl font-medium">{post.title}</h2>

        <div className="updates">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={680}
              height={442}
              className="mb-12 rounded-lg"
            />
          )}

          <RenderMarkdown code={post.body.code} />
        </div>
      </article>
    </div>
  )
}
