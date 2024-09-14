import { Model } from "@/types"

import { Icons } from "@/components/shared/icons"

export const models: Model[] = [
  {
    label: "distil-whisper-large-v3-en",
    value: "Distil Whisper Large v3 English",
    company: "Distil Whisper",
    href: "https://huggingface.co/distil-whisper",
    image: Icons.distilWhisper,
  },
  {
    label: "gemma2-9b-it",
    value: "Gemma 2 9B Italian",
    company: "Google",
    href: "https://www.google.com/",
    image: Icons.google,
  },
  {
    label: "gemma-7b-it",
    value: "Gemma 7B Italian",
    company: "Google",
    href: "https://www.google.com/",
    image: Icons.google,
  },
  {
    label: "llama3-groq-70b-8192-tool-use-preview",
    value: "Llama 3 Groq 70B Tool Use (Preview)",
    image: Icons.groq,
    company: "Groq",
    href: "https://www.groq.com/",
  },
  {
    label: "llama3-groq-8b-8192-tool-use-preview",
    value: "Llama 3 Groq 8B Tool Use (Preview)",
    image: Icons.groq,
    company: "Groq",
    href: "https://www.groq.com/",
  },
  {
    label: "llama-3.1-70b-versatile",
    value: "Llama 3.1 70B Versatile",
    image: Icons.meta,
    company: "Meta",
    href: "https://www.meta.com/",
  },
  {
    label: "llama-3.1-8b-instant",
    value: "Llama 3.1 8B Instant",
    image: Icons.meta,
    company: "Meta",
    href: "https://www.meta.com/",
  },
  {
    label: "llama-guard-3-8b",
    value: "Llama Guard 3 8B",
    image: Icons.meta,
    company: "Meta",
    href: "https://www.meta.com/",
  },
  {
    label: "llama3-70b-8192",
    value: "Meta Llama 3 70B",
    image: Icons.meta,
    company: "Meta",
    href: "https://www.meta.com/",
  },
  {
    label: "llama3-8b-8192",
    value: "Meta Llama 3 8B",
    image: Icons.meta,
    company: "Meta",
    href: "https://www.meta.com/",
  },
  {
    label: "mixtral-8x7b-32768",
    value: "Mixtral 8x7B",
    image: Icons.mistral,
    company: "Mistral",
    href: "https://mistral.ai/",
  },
  {
    label: "whisper-large-v3",
    value: "Whisper Large v3",
    image: Icons.openAi,
    company: "OpenAI",
    href: "https://www.openai.com/",
  },
]
