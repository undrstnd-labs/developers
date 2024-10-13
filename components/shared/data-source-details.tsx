"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getFileTypeIcon } from "@/data/file-icons"
import { Resource } from "@prisma/client"

import { formatDate } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { SecretCopy } from "@/components/shared/secret-copy"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editResource } from "@/actions/resource"
import { toast } from "@/hooks/use-toast"

interface DataSourceDetailsProps {
  resource: Resource | null
  isModalOpen: boolean
  handleModalClose: () => void
  action: "view" | "edit" | "delete" | null
}

export function DataSourceDetails({
  resource,
  isModalOpen,
  handleModalClose,
  action,
}: DataSourceDetailsProps) {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [editedResource, setEditedResource] = useState<Partial<Resource>>({} as Resource)

  React.useEffect(() => {
    if (action === "edit" && resource) {
      setEditedResource({ ...resource })
    } else {
      setEditedResource({} as Resource)
    }
    setDeleteConfirmation("")
  }, [action, resource])

  async function handleEdit() {
    setLoading(true)
    if (!resource) return toast({
      title: "Resource not found",
      variant: "destructive",
    })

    try {
      await editResource(resource.id, resource.userId, editedResource)
      toast({
        title: "Resource edited successfully",
      })
      handleModalClose()
      router.refresh()
    } catch (error) {
      return toast({
        title: "Failed to edit resource",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    if (deleteConfirmation === resource?.name) {
      try {
        // ...
      } catch (error) {
        // ...
      } finally {
        setLoading(false)
      }

      console.log("Deleting resource:", resource)
      handleModalClose()
    }
  }

  if (!resource) return null

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {action === "view" && resource.name}
            {action === "edit" && "Edit Data Source"}
            {action === "delete" && "Delete Data Source"}
          </DialogTitle>
          <DialogDescription>
            {action === "view" && resource.description}
            {action === "edit" && "Edit the details of your data source."}
            {action === "delete" &&
              "Are you sure you want to delete this data source? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        {action === "view" && (
          <div className="space-y-4">
            <Link
              href={resource.url}
              target="_blank"
              className="duration-time flex items-center gap-4 rounded-lg border-2 p-2 transition-colors hover:bg-secondary"
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
                <SecretCopy secret={resource.id} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span>{formatDate(resource.createdAt)}</span>
            </div>
          </div>
        )}
        {action === "edit" && editedResource && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedResource.name}
                onChange={(e) =>
                  setEditedResource({ ...editedResource, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={editedResource.description as string}
                onChange={(e) =>
                  setEditedResource({
                    ...editedResource,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
        {action === "delete" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please type the name of the data source to confirm deletion:
              <span className="font-semibold"> {resource.name}</span>
            </p>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type data source name here"
            />
          </div>
        )}
        <DialogFooter>
          {action === "view" && (
            <Button variant="outline" onClick={handleModalClose}>
              Close
            </Button>
          )}
          {action === "edit" && (
            <>
              <Button
                disabled={loading}
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>

              <Button disabled={loading} onClick={handleEdit}>
                {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
                Save Changes
              </Button>
            </>
          )}
          {action === "delete" && (
            <>
              <Button
                disabled={loading}
                variant="outline"
                onClick={handleModalClose}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading || deleteConfirmation !== resource.name}
              >
                {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
                Delete
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
