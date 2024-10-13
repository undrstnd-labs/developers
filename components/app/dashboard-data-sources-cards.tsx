"use client"

import { useState } from "react"
import { getFileTypeIcon } from "@/data/file-icons"
import { Resource } from "@prisma/client"

import { DataSourceDetails } from "@/components/shared/data-source-details"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardDataSourcesCards({
  resources,
}: {
  resources: Resource[]
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [action, setAction] = useState<"view" | "edit" | "delete" | null>(null)
  const [selectedDataSource, setSelectedDataSource] = useState<Resource | null>(
    null
  )

  const handleCardClick = (dataSource: Resource) => {
    setSelectedDataSource(dataSource)
    setAction("view")
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedDataSource(null)
    setAction(null)
  }

  const handleEdit = (dataSource: Resource) => {
    setSelectedDataSource(dataSource)
    setAction("edit")
    setIsModalOpen(true)
  }

  const handleDelete = (dataSource: Resource) => {
    setSelectedDataSource(dataSource)
    setAction("delete")
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {resources.map((dataSource) => (
          <Card
            key={dataSource.name}
            className="duration-time relative transition-colors hover:bg-secondary"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div
                  className="flex cursor-pointer items-center gap-4"
                  onClick={() => handleCardClick(dataSource)}
                >
                  {getFileTypeIcon(dataSource.type)}
                  <div>
                    <div className="font-medium">{dataSource.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {dataSource.description}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                      <Icons.more className="size-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(dataSource)}>
                      <Icons.edit className="mr-2 size-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(dataSource)}>
                      <Icons.trash className="mr-2 size-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataSourceDetails
        resource={selectedDataSource}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        action={action}
      />
    </>
  )
}
