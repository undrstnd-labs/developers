import { Icons } from "@/components/shared/icons"

export const getFileTypeIcon = (fileType: string) => {
  switch (fileType) {
    case "application/pdf":
      return <Icons.post className="size-6" />
    case "text/csv":
      return <Icons.sheet className="size-6" />
    case "application/json":
      return <Icons.json className="size-6" />
    default:
      return null
  }
}
