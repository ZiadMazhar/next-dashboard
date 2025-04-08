"use client"

import { useEffect } from "react"
import { useAppSelector } from "../store"
import type React from "react"

export default function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const darkMode = useAppSelector((state) => state.ui.darkMode)

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    console.log("Dark mode state:", darkMode)
    console.log("Dark class applied:", document.documentElement.classList.contains("dark"))
  }, [darkMode])

  return <>{children}</>
}
