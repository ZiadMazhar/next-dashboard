"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/Sidebar"
import { useAuth } from "../../hooks/useAuth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
