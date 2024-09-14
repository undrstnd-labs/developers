import { APIToken } from "@prisma/client"

import { formatDate } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function DashboardApiKeyTable({ tokens }: { tokens: APIToken[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Name</TableHead>
              <TableHead className="min-w-[200px]">Secret Key</TableHead>
              <TableHead className="hidden min-w-[150px] sm:table-cell">
                Created
              </TableHead>
              <TableHead className="min-w-[100px] text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell className="font-medium">{token.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{token.id.slice(0, 3)}...</span>
                    <span>{token.id.slice(-3)}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Tooltip>
                    <TooltipTrigger>
                      {token.createdAt.toISOString().split("T")[0]}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatDate(token.createdAt)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.more className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
