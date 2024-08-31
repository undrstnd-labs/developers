import * as React from "react"
import {
  Body,
  Button,
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

export function EmailNewUser({ username }: { username: string }) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to {siteConfig.name} - {username} will be thrilled to have you
        on board!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={siteConfig.images.logo}
            width="170"
            height="50"
            alt={`${siteConfig.name} logo`}
            style={logo}
          />
          <Text style={heading}>Welcome to {siteConfig.name}</Text>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>
            Welcome to {siteConfig.name}! I&apos;m Ayoub, one of the founders.
          </Text>
          <Text style={paragraph}>
            We&apos;ve been working on {siteConfig.name} for the past months,
            and during this time, we&apos;ve implemented the basic functionality
            to get started. However, with your feedback, we can make the right
            decisions to improve the platform.
          </Text>
          <Text style={paragraph}>
            During our private beta phase, you may encounter some bugs, but we
            genuinely want all your feedback.
          </Text>
          <Text style={paragraph}>
            Should you have any questions, please don&apos;t hesitate to{" "}
            <Link style={link} href={`${siteConfig.url}/contact`}>
              contact us
            </Link>
          </Text>
          {/*
           * TODO: Generate mail/hero-new-user.png
           */}
          <Img
            src={`${siteConfig.url}/mail/hero-new-user.png`}
            width={600}
            height={400}
            alt={`${siteConfig.name}`}
            style={logo}
          />

          <Text style={paragraph}>
            Best regards, founders
            <br />
            <Text style={boldText}>Hortensia Agency</Text>
          </Text>

          <Section style={btnContainer}>
            <Button style={button} href={siteConfig.url}>
              Get started
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            <Link href="https://hortensia-agency.com">Hortensia Agency</Link>,
            290 Centre Urbain Nord Ariana, Tunisia
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const logo = {
  margin: "0 auto",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const boldText = {
  fontWeight: "bold",
  fontSize: "19px",
}

const btnContainer = {
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#73cb6b",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "10px 0",
}

const link = {
  color: "#556cd6",
  textDecoration: "underline",
}
