"use server"

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv"
import { NotionLoader } from "@langchain/community/document_loaders/fs/notion"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx"
import { PineconeStore } from "@langchain/pinecone"
import { JSONLoader } from "langchain/document_loaders/fs/json"

import { pinecone } from "@/lib/pinecone"
import { embeddingModel } from "@/lib/undrstnd"

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
  const fileCached = await fetch(url).then((res) => res.blob())
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
