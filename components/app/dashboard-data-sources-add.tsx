"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Resource, User } from "@prisma/client"
import { DropzoneOptions } from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { env } from "@/env.mjs"

import { uploadDataSource } from "@/lib/storage"
import { generateDataSourceId } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

import { DataSourceDetails } from "@/components/shared/data-source-details"
import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { vectorizedDocument } from "@/actions/pinecone"
import { createResource } from "@/actions/resource"

function FileSvgDraw() {
  return (
    <>
      <svg
        className="mb-3 size-8 text-muted"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-muted-foreground">
        <span className="font-semibold">
          Drag and drop a file or click to upload
        </span>
      </p>
      <p className="text-sm text-muted-foreground">
        <span>PDF, CSV, XLSX, MD, PPTX, or JSON files supported</span>
      </p>
    </>
  )
}

const uploadFileSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 25 * 1024 * 1024, {
        message: "Your file is too large",
      })
    )
    .max(1, {
      message: "Only one file is allowed",
    }),
})

export function DashboardDataSourcesAdd({ user }: { user: User }) {
  const id = generateDataSourceId()
  const router = useRouter()

  const [progress, setProgress] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [finish, setFinish] = React.useState<Resource>({} as Resource)

  const form = useForm<z.infer<typeof uploadFileSchema>>({
    resolver: zodResolver(uploadFileSchema),
  })

  const dropzone = {
    multiple: false,
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
    },
  } satisfies DropzoneOptions

  const simulateUpload = () => {
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval)
          return prev
        }
        return prev + 2
      })
    }, 500)

    return interval
  }

  async function onSubmit(data: z.infer<typeof uploadFileSchema>) {
    setLoading(true)
    const progress = simulateUpload()
    const file = data.files[0]

    try {
      const uploadedFile = await uploadDataSource({
        file,
        fileId: id,
        userId: user.id,
      })
      setProgress(80)

      // TODO: Add usage here and remove from their fundings
      const [_, resource] = await Promise.all([
        vectorizedDocument({
          props: {
            id,
            type: file.type,
            url: `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${uploadedFile.fullPath}`,
          },
        }),
        createResource({
          id,
          userId: user.id,
          name: data.name,
          handle: file.name,
          description: data.description as string,
          type: file.type,
          url: `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${uploadedFile.fullPath}`,
          size: file.size,
        }),
      ])

      router.refresh()
      setProgress(100)
      toast({
        title: "Upload successful",
      })

      await new Promise((resolve) => setTimeout(resolve, 500))
      form.reset({ files: [] })

      setFinish(resource)
    } catch (error) {
      console.error(error)
      toast({
        title: "Upload failed",
        variant: "destructive",
      })

      clearInterval(progress)
      setProgress(0)
    } finally {
      clearInterval(progress)
      setProgress(0)
      setLoading(false)
    }
  }

  if (finish.id) {
    return (
      <DataSourceDetails
        resource={finish}
        isModalOpen={true}
        handleModalClose={() => setFinish({} as Resource)}
      />
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"sm"}>Add Data Source</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a file</DialogTitle>
          <DialogDescription>
            Select a file to upload as your data source
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Data Source Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the use of your data source"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-2" />

            <div
              className={`flex w-full flex-col items-center justify-center gap-x-2 rounded-md px-2 pb-1 outline outline-1 outline-border ${form.watch("files") ? "pt-4" : "pt-2"}`}
            >
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      dropzoneOptions={dropzone}
                      reSelect={true}
                      className="relative rounded-lg bg-background p-2"
                    >
                      <div className="flex w-full flex-col items-center justify-center">
                        <FileInput className="w-full outline-dashed outline-1 outline-white">
                          <div className="flex flex-col items-center justify-center pb-4 pt-3">
                            <FileSvgDraw />
                          </div>
                        </FileInput>

                        {field.value && field.value.length > 0 && (
                          <FileUploaderContent className="w-full text-center">
                            {field.value.map((file, i) => (
                              <FileUploaderItem
                                uploading={loading}
                                key={i}
                                index={i}
                              >
                                <Icons.attachement className="size-4 stroke-current" />
                                <span className="pr-8">{file.name}</span>
                              </FileUploaderItem>
                            ))}
                            {progress != 0 && (
                              <Progress
                                value={progress}
                                className="h-1 w-full bg-zinc-200"
                              />
                            )}
                          </FileUploaderContent>
                        )}
                      </div>
                    </FileUploader>
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors && (
              <div className="text-sm text-destructive">
                {Object.values(form.formState.errors).map((error) => (
                  <p key={error.message}>{error.message}</p>
                ))}
              </div>
            )}
            <div className="h-3" />
            <Button
              type="submit"
              className="h-8 w-full py-2"
              disabled={loading}
            >
              {loading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
