import type React from "react"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReduxProvider } from "../store/provider"
import "../app/styles.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DASHBOARD",
  icons: {
    icon: "/favicon.ico", },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
 