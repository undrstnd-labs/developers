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

/**
 * This function vectorizes a document and stores it in a Pinecone index.
 *
 * @param props - The properties of the document to vectorize. The properties include the document `id`, `type`, and `url`.
 *
 * ### Explanation:
 * - The function takes a single parameter `props` which is an object containing the properties of the document to vectorize.
 * - It creates a new Pinecone index using the `pinecone.Index` function.
 * - It fetches the document from the specified URL and loads it using the appropriate loader based on the document type.
 * - It vectorizes the document using the embedding model and stores it in the Pinecone index.
 *
 * ### Types:
 * - `props`: An object containing the properties of the document to vectorize.
 *
 * ### TODO:
 * - Add support for more document types.
 */
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

/**
 * This function deletes a document in pinecone for a user.
 *
 * @param namespace - The unique identifier of the document in the Pinecone index.
 *
 * @returns A promise that resolves to the deleted resource.
 *
 * ### Explanation:
 * - The function takes the following parameter: `namespace`.
 * - It deletes the document from the Pinecone index.
 * - It returns the deleted resource.
 *
 * ### Types:
 * - `namespace` is the unique identifier of the document in the Pinecone index, in string format.
 * - The function returns a promise that resolves to the deleted resource.
 */
export async function deleteDocument(namespace: string) {
  const pineconeIndex = pinecone.Index("developers")
  await pineconeIndex.namespace(namespace).deleteAll()
}
