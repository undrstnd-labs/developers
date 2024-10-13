import { supabase } from "@/lib/supabase"

interface UploadDataSourceProps {
  file: File
  fileId: string
  userId: string
}

export async function uploadDataSource({
  file,
  fileId,
  userId,
}: UploadDataSourceProps) {
  const { data, error } = await supabase.storage
    .from("data-sources")
    .upload(`/${userId}/${fileId}.${file.name.split(".").pop()}`, file)
  if (error) {
    throw error
  }

  return data
}

interface DeleteDataSourceProps {
  fileId: string
  userId: string
}

export async function deleteDataSource({
  fileId,
  userId,
}: DeleteDataSourceProps) {
  const { data: files } = await supabase.storage
    .from("data-sources")
    .list(`${userId}`)

  if (!files) {
    throw new Error("Files not found")
  }

  const file = files?.find((file) => file.name.includes(fileId))

  if (!file) {
    throw new Error("File not found")
  }

  const { error } = await supabase.storage
    .from("data-sources")
    .remove([`${userId}/${file.name}`])
  if (error) {
    throw error
  }
}
