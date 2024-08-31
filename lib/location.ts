import { headers } from "next/headers"
import countries from "@/data/countries.json"

export function getCountryCode() {
  const countryCode = headers().get("x-vercel-ip-country") || "SE"

  return countryCode
}

export function getCountryName() {
  const country = countries.find((country) => country.cca2 === getCountryCode())

  return country?.flag + " - " + country?.cca2
}
