import { APIToken } from "@prisma/client"

import { formatDate } from "@/lib/utils"

import { DashboardApiKeyDelete } from "@/components/app/dashboard-api-key-delete"
import { DashboardApiKeyEdit } from "@/components/app/dashboard-api-key-edit"
import { Icons } from "@/components/shared/icons"
import { SecretCopy } from "@/components/shared/secret-copy"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
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
                  <SecretCopy secret={token.id} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Tooltip delayDuration={0}>
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
                      <DashboardApiKeyEdit
                        token={token}
                        userId={token.userId}
                      />
                      <DashboardApiKeyDelete
                        token={token}
                        userId={token.userId}
                      />
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
