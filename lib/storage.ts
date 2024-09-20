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
