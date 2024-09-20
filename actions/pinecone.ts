"use server"

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv"
import { NotionLoader } from "@langchain/community/document_loaders/fs/notion"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/pinecone"
import { JSONLoader } from "langchain/document_loaders/fs/json"

import { env } from "@/env.mjs"

import { pinecone } from "@/lib/pinecone"

const embeddingModel = new OpenAIEmbeddings({
  openAIApiKey: env.OPENAI_API_KEY,
})

interface VectorDocument {
  props: {
    id: string
    type: string
    url: string
  }
}

export async function vectorizedDocument({ props }: VectorDocument) {
  const { id, type, url } = props

  const pineconeIndex = pinecone.Index("developers")
  const fileCached = await fetch(
    `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`
  ).then((res) => res.blob())
  const loaderType = type.toLowerCase().split("/")[1]

  let loader: any
  switch (loaderType) {
    case "pdf":
      loader = new PDFLoader(fileCached)
      break
    case "csv":
      loader = new CSVLoader(fileCached)
      break
    case "pptx":
      loader = new PPTXLoader(fileCached)
      break
    case "json":
      loader = new JSONLoader(fileCached)
      break
  }

  const documents = await loader.load()
  await PineconeStore.fromDocuments(documents, embeddingModel, {
    pineconeIndex,
    namespace: id,
  })
}
