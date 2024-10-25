'use client'

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Icons } from "@/components/shared/icons"
import { models } from "@/data/models"

interface FormData {
  apiKey: string
  endpoint: string
  datasourceKey: string
  model: string
  isStreaming: boolean
  temperature: number
  maxTokens: number
}

interface DashboardPlaygroundParametersProps {
  onSubmit: (data: FormData) => void
}

export function DashboardPlaygroundParameters({
  onSubmit,
}: DashboardPlaygroundParametersProps) {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      apiKey: "",
      endpoint: "llm",
      datasourceKey: "",
      model: "",
      isStreaming: false,
      temperature: 0.7,
      maxTokens: 2048,
    },
  })

  const endpoint = watch("endpoint")

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                <Icons.key className="size-4" />
                API Key
              </Label>
              <Controller
                name="apiKey"
                control={control}
                render={({ field }) => (
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    className="font-mono"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint" className="flex items-center gap-2">
                <Icons.zap className="size-4" />
                Endpoint
              </Label>
              <Controller
                name="endpoint"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="endpoint">
                      <SelectValue placeholder="Select an endpoint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llm">LLM</SelectItem>
                      <SelectItem value="datasource">Data Source</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {endpoint === "datasource" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="datasource-key" className="flex items-center gap-2">
                  <Icons.key className="size-4" />
                  Datasource Key
                </Label>
                <Controller
                  name="datasourceKey"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="datasource-key"
                      type="text"
                      placeholder="Enter your Datasource key"
                      className="font-mono"
                      {...field}
                    />
                  )}
                />
              </motion.div>
            )}
            <div className="space-y-2">
              <Label htmlFor="model" className="flex items-center gap-2">
                <Icons.info className="size-4" />
                Model
              </Label>
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        {models.map((model) => (
                            <SelectItem key={model.value} value={model.value}>
                            {model.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="stream" className="flex cursor-pointer items-center gap-2">
                <Icons.zap className="size-4" />
                Enable Streaming
              </Label>
              <Controller
                name="isStreaming"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="stream"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Icons.thermometer className="size-4" />
                  Temperature
                </Label>
                <span className="text-sm font-medium">
                  {watch("temperature").toFixed(1)}
                </span>
              </div>
              <Controller
                name="temperature"
                control={control}
                render={({ field }) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Slider
                          id="temperature"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adjust the randomness of the model&apos;s output</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="max-tokens" className="flex items-center gap-2">
                  <Icons.hash className="size-4" />
                  Max Tokens
                </Label>
                <span className="text-sm font-medium">{watch("maxTokens")}</span>
              </div>
              <Controller
                name="maxTokens"
                control={control}
                render={({ field }) => (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Slider
                          id="max-tokens"
                          min={1}
                          max={4096}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Set the maximum number of tokens in the response</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Apply Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}