import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
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
        We welcome you to {siteConfig.name}! Get started with us.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={siteConfig.images.logo}
            height="42"
            alt={`${siteConfig.name} logo`}
            style={logo}
          />
          <Text style={paragraph}>Hi there,</Text>
          <Text style={paragraph}>
            Welcome to {siteConfig.name}! We&apos;re excited to have you on
            board. Before you get started, we need to verify your email address.
            Please click the button below to complete the registration process.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${siteConfig.url}/register`}>
              Get started
            </Button>
          </Section>
          <Hr style={hr} />

          <Text style={paragraph}>
            You are accepted in the whitelist, you can now access the platform.
            We can&apos;t wait to see what you build with {siteConfig.name}!
            Check out our documentation to get started.
          </Text>
          <Hr style={hr} />

          <Text style={paragraph}>
            Best,
            <br />
            The {siteConfig.name} team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>Undrstnd Labs Inc, 5000 Monastir, Tunisia</Text>
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

const btnContainer = {
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#5F51E8",
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
