import React from "react"

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
