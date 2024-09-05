"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Combobox({
  frameworks,
  value,
  onChange,
  className,
}: {
  frameworks: Array<{
    label: string
    value: string
    icon: (typeof Icons)[keyof typeof Icons]
  }>
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between space-x-2"
        >
          {value &&
            frameworks
              .find((framework) => framework.value === value)
              ?.icon({
                className: "h-4 w-4 shrink-0 mr-2",
              })}
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    /* setValue(currentValue === value ? "" : currentValue)
                    setOpen(false) */
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <framework.icon
                    className={cn(
                      "mr-2 size-4",
                      value === framework.value
                        ? "filter-none"
                        : "opacity-50 grayscale"
                    )}
                  />

                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
