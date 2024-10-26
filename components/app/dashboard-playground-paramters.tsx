"use client"

import { models } from "@/data/models"
import { zodResolver } from "@hookform/resolvers/zod"
import { APIToken } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { playgroundParamsSchema } from "@/config/validation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type FormData = z.infer<typeof playgroundParamsSchema>
interface DashboardPlaygroundParametersProps {
  keys: APIToken[]
  onSubmit: (data: FormData) => void
}

export function DashboardPlaygroundParameters({
  keys,
  onSubmit,
}: DashboardPlaygroundParametersProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(playgroundParamsSchema),
    defaultValues: {
      apiKey: keys[0]?.id || "",
      endpoint: "llm",
      datasourceKey: "",
      model: models[6].label,
      isStreaming: false,
      temperature: 0.7,
      maxTokens: 2048,
    },
  })

  return (
    <Card className="h-full bg-muted/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-12"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your API key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endpoint</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an endpoint" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="llm">LLM</SelectItem>
                        <SelectItem value="datasource">Data Source</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("endpoint") === "datasource" && (
                <FormField
                  control={form.control}
                  name="datasourceKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Datasource Key</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Datasource key"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.label} value={model.label}>
                            <div className="flex items-center gap-2 truncate">
                              <model.image className="size-4" />
                              {model.value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isStreaming"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="flex cursor-pointer items-center gap-2">
                      Enable Streaming
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Temperature</FormLabel>
                      <span className="text-sm font-medium">
                        {form.watch("temperature").toFixed(1)}
                      </span>
                    </div>
                    <FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Slider
                              min={0}
                              max={1}
                              step={0.1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Adjust the randomness of the mode&apos;s output
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxTokens"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Max Tokens</FormLabel>
                      <span className="text-sm font-medium">
                        {form.watch("maxTokens")}
                      </span>
                    </div>
                    <FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Slider
                              min={1}
                              max={4096}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) =>
                                field.onChange(value[0])
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Set the maximum number of tokens in the response
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Apply Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
