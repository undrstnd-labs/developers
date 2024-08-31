import * as React from "react"
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"

export function EmailWhitelist() {
  return (
    <Html>
      <Head />
      <Preview>
        You have joined the whitelist for {siteConfig.name} private beta.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={siteConfig.images.logo}
              width="50"
              height="50"
              alt={`${siteConfig.name} logo`}
            />
            <Hr style={hr} />
            {/*
             * TODO: Generate mail/hero-whitelist.png
             */}
            <Img
              src={`${siteConfig.url}/mail/hero-whitelist.png`}
              width="600"
              height="300"
              alt={`${siteConfig.name}`}
            />
            <Text style={paragraph}>
              Thank you for signing up for the whitelist for {siteConfig.name}!
              We&apos;re thrilled to have you on board and appreciate your
              interest in what we&apos;re working on.
            </Text>
            <Text style={paragraph}>
              We can&apos;t wait to share {siteConfig.name} with you and the
              rest of our community. In the meantime, if you have any questions
              or thoughts, feel free to reply to this email.
            </Text>
            <Text style={paragraph}>
              For the latest updates you can follow us on X{" "}
              <Link href={siteConfig.links.twitter} style={anchor}>
                @Stelify
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              You&apos;re receiving this email because you opted-in to receive
              updates from <Link href={siteConfig.url}>{siteConfig.name}</Link>
            </Text>
            <Text style={footer}>
              <Link href="https://hortensia-agency.com">Hortensia Agency</Link>,
              290 Centre Urbain Nord Ariana, Tunisia
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}

const box = {
  padding: "0 48px",
}

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
}

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
}

const anchor = {
  color: "#556cd6",
  textDecoration: "underline",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}
