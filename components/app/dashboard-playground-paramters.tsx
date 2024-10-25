import React from "react"

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

interface DashboardPlaygroundParametersProps {
  apiKey: string
  setApiKey: (key: string) => void
  endpoint: string
  setEndpoint: (endpoint: string) => void
  datasourceKey: string
  setDatasourceKey: (key: string) => void
  model: string
  setModel: (model: string) => void
  isStreaming: boolean
  setIsStreaming: (isStreaming: boolean) => void
  temperature: number
  setTemperature: (temperature: number) => void
  maxTokens: number
  setMaxTokens: (maxTokens: number) => void
}

export function DashboardPlaygroundParameters({
  apiKey,
  setApiKey,
  endpoint,
  setEndpoint,
  datasourceKey,
  setDatasourceKey,
  model,
  setModel,
  isStreaming,
  setIsStreaming,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
}: DashboardPlaygroundParametersProps) {
  return (
    <div className="w-1/3 overflow-y-auto border-l border-border p-4">
      <h2 className="mb-4 text-2xl font-bold">Parameters</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
          />
        </div>
        <div>
          <Label htmlFor="endpoint">Endpoint</Label>
          <Select value={endpoint} onValueChange={setEndpoint}>
            <SelectTrigger id="endpoint">
              <SelectValue placeholder="Select an endpoint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llm">LLM</SelectItem>
              <SelectItem value="datasource">Data Source</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {endpoint === "datasource" && (
          <div>
            <Label htmlFor="datasource-key">Datasource Key</Label>
            <Input
              id="datasource-key"
              type="text"
              value={datasourceKey}
              onChange={(e) => setDatasourceKey(e.target.value)}
              placeholder="Enter your Datasource key"
            />
          </div>
        )}
        <div>
          <Label htmlFor="model">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-v1">Claude v1</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="stream"
            checked={isStreaming}
            onCheckedChange={setIsStreaming}
          />
          <Label htmlFor="stream">Enable Streaming</Label>
        </div>
        <div>
          <Label htmlFor="temperature">
            Temperature: {temperature.toFixed(1)}
          </Label>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
          <Slider
            id="max-tokens"
            min={1}
            max={4096}
            step={1}
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
          />
        </div>
      </div>
    </div>
  )
}
