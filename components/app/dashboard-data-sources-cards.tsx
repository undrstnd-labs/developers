"use client"

import { useMemo, useState } from "react"
import { getFileTypeIcon } from "@/data/file-icons"
import { Resource } from "@prisma/client"

import { DataSourceDetails } from "@/components/shared/data-source-details"
import { Icons } from "@/components/shared/icons"
import { Card, CardContent } from "@/components/ui/card"

// TODO:; Add empty state of no data sources
export function DashboardDataSourcesCards({
  resources,
}: {
  resources: Resource[]
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDataSource, setSelectedDataSource] = useState<Resource>(
    {} as Resource
  )

  const handleCardClick = (dataSource: Resource) => {
    setSelectedDataSource(dataSource)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {resources.map((dataSource) => (
          <Card
            key={dataSource.name}
            onClick={() => handleCardClick(dataSource)}
            className="cursor-pointer transition-colors hover:bg-muted"
          >
            <CardContent className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getFileTypeIcon(dataSource.type)}
                <div>
                  <div className="font-medium">{dataSource.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {dataSource.description}
                  </div>
                </div>
              </div>
              <Icons.chevronRight className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <DataSourceDetails
        resource={selectedDataSource}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </>
  )
}
