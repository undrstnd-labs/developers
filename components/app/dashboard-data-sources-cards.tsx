"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const dataSources = [
  {
    id: "ds-001",
    filename: "sales_data.csv",
    fileType: "CSV",
    score: 85,
    status: "Live",
  },
  {
    id: "ds-002",
    filename: "customer_info.json",
    fileType: "JSON",
    score: 92,
    status: "Live",
  },
  {
    id: "ds-003",
    filename: "inventory_report.xlsx",
    fileType: "XLSX",
    score: 78,
    status: "Pending",
  },
  {
    id: "ds-004",
    filename: "marketing_campaign.pdf",
    fileType: "PDF",
    score: 65,
    status: "Cancelled",
  },
  {
    id: "ds-005",
    filename: "financial_statements.docx",
    fileType: "DOCX",
    score: 90,
    status: "Live",
  },
  {
    id: "ds-006",
    filename: "user_activity.log",
    fileType: "LOG",
    score: 72,
    status: "Pending",
  },
  {
    id: "ds-007",
    filename: "product_catalog.xml",
    fileType: "XML",
    score: 85,
    status: "Live",
  },
  {
    id: "ds-008",
    filename: "marketing_insights.ppt",
    fileType: "PPT",
    score: 80,
    status: "Cancelled",
  },
]

export function DashboardDataSourcesCards() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("filename")
  const [sortOrder, setSortOrder] = useState<string>("asc")
  const [showModal, setShowModal] = useState<boolean>(false)
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  const filteredDataSources = useMemo(() => {
    return dataSources
      .filter((ds) =>
        ds.filename.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "filename") {
          return sortOrder === "asc"
            ? a.filename.localeCompare(b.filename)
            : b.filename.localeCompare(a.filename)
        } else {
          return sortOrder === "asc" ? a.score - b.score : b.score - a.score
        }
      })
  }, [searchTerm, sortBy, sortOrder])

  const handleCopyId = (id: string) => {
    copyToClipboard(id)
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icons.search className="size-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary"
            placeholder="Search data sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <span>Sort by</span>
            <Icons.chevronRight className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <DropdownMenuRadioItem value="filename">
                Filename
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="score">Score</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value)}
            >
              <DropdownMenuRadioItem value="asc">
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">
                Descending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredDataSources.map((ds) => (
          <div
            key={ds.id}
            className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg"
          >
            <div
              className={`absolute left-4 top-4 size-3 rounded-full ${
                ds.status === "Live"
                  ? "bg-green-500"
                  : ds.status === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.post className="size-6 text-gray-400" />
                  <span className="text-sm font-medium">{ds.filename}</span>
                </div>
                <span className="text-sm font-medium">{ds.score}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div
                  className="cursor-pointer text-sm font-medium text-primary hover:underline"
                  onClick={() => handleCopyId(ds.id)}
                >
                  {ds.id}
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  prefetch={false}
                >
                  <span>View File</span>
                  <Icons.arrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Add Data Source</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="filename" className="block font-medium">
                  Filename
                </label>
                <input
                  type="text"
                  id="filename"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter filename"
                />
              </div>
              <div>
                <label htmlFor="fileType" className="block font-medium">
                  File Type
                </label>
                <input
                  type="text"
                  id="fileType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter file type"
                />
              </div>
              <div>
                <label htmlFor="score" className="block font-medium">
                  Score
                </label>
                <input
                  type="number"
                  id="score"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  placeholder="Enter score"
                />
              </div>
              <div>
                <label htmlFor="status" className="block font-medium">
                  Status
                </label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                >
                  <option value="Live">Live</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
