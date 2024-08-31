export function Blur() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div className="fix-safari-blur h-56 bg-gradient-to-br from-blue-500 to-blue-400 blur-[106px] dark:from-sky-700"></div>
      <div className="fix-safari-blur h-32 bg-gradient-to-r from-sky-400 to-blue-300 blur-[106px] dark:to-blue-600"></div>
    </div>
  )
}
