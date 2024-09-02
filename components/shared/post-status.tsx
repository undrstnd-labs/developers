import { cn } from "@/lib/utils"

// TODO: Move to shared and improve it
export function PostStatus({ status }) {
  return (
    <div
      className={cn(
        "mb-4 inline-block rounded-md border px-2 py-1 text-[10px] font-medium",
        status === "Update" && "border-[#DFB31D] text-[#DFB31D]",
        status === "Engineering" && "border-[#34b285] text-[#34b285]"
      )}
    >
      {status}
    </div>
  )
}
