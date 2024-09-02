import { z } from "zod"

export const waitlistSchema = z.object({
  email: z.string().email(),
})

export const authOTPCodeSchema = z.object({
  email: z.string().email({
    message: "Votre email est invalide",
  }),
  pin: z.string().length(6),
})

export const authUserEmailSchema = z.object({
  email: z.string().email({
    message: "Votre email est invalide",
  }),
})

export const authOnboardingSchema = z.object({
  username: z.string().min(3, {
    message: "Votre nom d'utilisateur doit contenir au moins 3 caractères",
  }),
  first_name: z.string().min(3, {
    message: "Votre nom est requis",
  }),
  last_name: z.string().min(3, {
    message: "Votre prénom est requis",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "Vous devez accepter les conditions d'utilisation",
  }),
})
