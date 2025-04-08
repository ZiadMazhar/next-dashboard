"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/Sidebar"
import { useAuth } from "../../hooks/useAuth"
import { useAppSelector } from "../../store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const { user, loading } = useAuth()
  const router = useRouter()
  const darkMode = useAppSelector((state) => state.ui.darkMode)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null 
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
