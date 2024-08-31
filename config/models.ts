import { Model } from "@/types/model"

export const models: Model[] = [
  {
    id: "distil-whisper-large-v3-en",
    active: true,
    name: "Distil Whisper Large v3 English",
    description:
      "Distil-Whisper is a smaller version of the Whisper model that was proposed in the paper Robust Knowledge Distillation via Large-Scale Pseudo Labelling. This English version of Distil-Whisper is optimized for English speech recognition.",
    developer: "@distil-whisper",
    provider: "HuggingFace",
    source: "https://huggingface.co/distil-whisper/distil-large-v3",
    tags: ["distil-whisper", "large", "v3", "english"],
    maxFileSize: 25 * 1024 * 1024,
  },
  {
    id: "gemma2-9b-it",
    active: true,
    name: "Gemma 2 9B Italian",
    description:
      "Gemma 2 is a large-scale multilingual language model developed by Google. This Italian version of Gemma 2 is optimized for Italian language tasks.",
    developer: "@google",
    provider: "HuggingFace",
    source: "https://huggingface.co/google/gemma-2-9b-it",
    tags: ["gemma", "9b", "italian"],
    maxContextWindow: 8192,
  },
  {
    id: "gemma-7b-it",
    active: true,
    name: "Gemma 7B Italian",
    description:
      "Gemma is a large-scale multilingual language model developed by Google. This Italian version of Gemma is optimized for Italian language tasks.",
    developer: "@google",
    provider: "HuggingFace",
    source: "https://huggingface.co/google/gemma-1.1-7b-it",
    tags: ["gemma", "7b", "italian"],
    maxContextWindow: 8192,
  },
  {
    id: "llama3-groq-70b-8192-tool-use-preview",
    active: true,
    name: "Llama 3 Groq 70B Tool Use (Preview)",
    description:
      "Llama 3 Groq is a version of the Llama model developed by Groq. This 70B parameter version of Llama 3 Groq is optimized for tool use tasks.",
    developer: "@groq",
    provider: "HuggingFace",
    source: "https://huggingface.co/Groq/Llama-3-Groq-70B-Tool-Use",
    tags: ["llama", "3", "groq", "70b", "tool-use", "preview"],
    maxContextWindow: 8192,
  },
  {
    id: "llama3-groq-8b-8192-tool-use-preview",
    active: true,
    name: "Llama 3 Groq 8B Tool Use (Preview)",
    description:
      "Llama 3 Groq is a version of the Llama model developed by Groq. This 8B parameter version of Llama 3 Groq is optimized for tool use tasks.",
    developer: "@groq",
    provider: "HuggingFace",
    source: "https://huggingface.co/Groq/Llama-3-Groq-8B-Tool-Use",
    tags: ["llama", "3", "groq", "8b", "tool-use", "preview"],
    maxContextWindow: 8192,
  },
  {
    id: "llama-3.1-405b",
    active: false,
    name: "Llama 3.1 405B",
    description:
      ": Llama 3.1 is an auto-regressive language model that uses an optimized transformer architecture.",
    developer: "@meta-llama",
    provider: "HuggingFace",
    source: "https://huggingface.co/meta-llama/Meta-Llama-3.1-405B",
    tags: ["llama", "3.1", "405b"],
    maxContextWindow: 131072,
  },
  {
    id: "llama-3.1-70b-versatile",
    active: true,
    name: "Llama 3.1 70B Versatile",
    description:
      "Llama 3.1 is a version of the Llama model developed by Meta. This 70B parameter version of Llama 3.1 is optimized for a variety of tasks.",
    developer: "@meta-llama",
    provider: "Github",
    source:
      "https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md",
    tags: ["llama", "3.1", "70b", "versatile"],
    maxContextWindow: 131072,
  },
  {
    id: "llama-3.1-8b-instant",
    active: true,
    name: "Llama 3.1 8B Instant",
    description:
      "Llama 3.1 is a version of the Llama model developed by Meta. This 8B parameter version of Llama 3.1 is optimized for fast inference.",
    developer: "@meta-llama",
    provider: "Github",
    source:
      "https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/MODEL_CARD.md",
    tags: ["llama", "3.1", "8b", "instant"],
    maxContextWindow: 131072,
  },
  {
    id: "llama-guard-3-8b",
    active: true,
    name: "Llama Guard 3 8B",
    description:
      "Llama Guard 3 is a version of the Llama model developed by Meta. This 8B parameter version of Llama Guard 3 is optimized for security and privacy tasks.",
    developer: "@meta-llama",
    provider: "HuggingFace",
    source: "https://huggingface.co/meta-llama/Llama-Guard-3-8B",
    tags: ["llama", "guard", "3", "8b"],
    maxContextWindow: 8192,
  },
  {
    id: "llama3-70b-8192",
    active: true,
    name: "Meta Llama 3 70B",
    description:
      "Llama 3 is a version of the Llama model developed by Meta. This 70B parameter version of Llama 3 is optimized for a variety of tasks.",
    developer: "@meta-llama",
    provider: "HuggingFace",
    source: "https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct",
    tags: ["llama", "3", "70b"],
    maxContextWindow: 8192,
  },
  {
    id: "llama3-8b-8192",
    active: true,
    name: "Meta Llama 3 8B",
    description:
      "Llama 3 is a version of the Llama model developed by Meta. This 8B parameter version of Llama 3 is optimized for a variety of tasks.",
    developer: "@meta-llama",
    provider: "HuggingFace",
    source: "https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct",
    tags: ["llama", "3", "8b"],
    maxContextWindow: 8192,
  },
  {
    id: "mixtral-8x7b-32768",
    active: true,
    name: "Mixtral 8x7B",
    description:
      "Mixtral is a large-scale multilingual language model developed by Mistral. This 8x7B parameter version of Mixtral is optimized for a variety of tasks.",
    developer: "@mistralai",
    provider: "HuggingFace",
    source: "https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1",
    tags: ["mixtral", "8x7b"],
    maxContextWindow: 32768,
  },
  {
    id: "whisper-large-v3",
    active: true,
    name: "Whisper Large v3",
    description:
      "Whisper is a large-scale speech recognition model developed by OpenAI. This version of Whisper is optimized for speech recognition tasks.",
    developer: "@openai",
    provider: "OpenAI",
    source: "https://huggingface.co/openai/whisper-large-v3",
    tags: ["whisper", "large", "v3"],
    maxFileSize: 25 * 1024 * 1024,
  },
]
