import React from "react"
import Link from "next/link"
import { getFileTypeIcon } from "@/data/file-icons"
import { Resource } from "@prisma/client"

import { formatDate } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function DataSourceDetails({
  resource,
  isModalOpen,
  handleModalClose,
}: {
  resource: Resource
  isModalOpen: boolean
  handleModalClose: () => void
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{resource.name}</DialogTitle>
          <DialogDescription>{resource.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Link
            href={resource.url}
            target="_blank"
            className="flex items-center gap-4 rounded-lg border-2 p-2 transition-colors duration-300 hover:bg-secondary"
          >
            {getFileTypeIcon(resource.type)}
            <div>
              <div className="font-medium">{resource.handle}</div>
              <div className="text-sm text-muted-foreground">
                {resource.size} KB
              </div>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Token</span>
            <div className="flex items-center gap-2">
              <code className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                {resource.id}
              </code>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created</span>
            <span>{formatDate(resource.createdAt)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleModalClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
