"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Table, BarChart, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import DarkModeToggle from "./DarkModeToggle"
import { useAppSelector } from "@/redux/hooks"

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
}

export default function Sidebar(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()
  const darkMode = useAppSelector((state) => state.ui.darkMode)

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Table",
      href: "/dashboard/table",
      icon: <Table className="h-5 w-5" />,
    },
    {
      name: "Charts",
      href: "/dashboard/charts",
      icon: <BarChart className="h-5 w-5" />,
    },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = async () => {
    await logout()
  }

  const bgClass = darkMode ? "bg-gray-800" : "bg-white"
  const textClass = darkMode ? "text-gray-100" : "text-gray-900"
  const borderClass = darkMode ? "border-gray-700" : "border-gray-200"
  const hoverBgClass = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
  const activeClass = darkMode ? "bg-blue-900 text-blue-100" : "bg-blue-100 text-blue-900"

  return (
    <>
   
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button
          onClick={toggleSidebar}
          className={`${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={`lg:hidden fixed inset-0 z-40 flex ${sidebarOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full ${bgClass} transform transition duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex-1 h-0 pt-16 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center justify-between px-4 mb-5">
              <h1 className={`text-xl font-bold ${textClass}`}>Dashboard</h1>
              <DarkModeToggle />
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    pathname === item.href ? activeClass : `${textClass} ${hoverBgClass}`
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className={`flex-shrink-0 flex border-t ${borderClass} p-4`}>
            <button onClick={handleLogout} className={`flex items-center text-base font-medium ${textClass}`}>
              <LogOut className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className={`flex flex-col h-0 flex-1 border-r ${borderClass} ${bgClass}`}>
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-between flex-shrink-0 px-4 mb-5">
                <h1 className={`text-xl font-bold ${textClass}`}>Dashboard</h1>
                <DarkModeToggle />
              </div>
              <nav className={`mt-5 flex-1 px-2 ${bgClass} space-y-1`}>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href ? activeClass : `${textClass} ${hoverBgClass}`
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className={`flex-shrink-0 flex border-t ${borderClass} p-4`}>
              <button onClick={handleLogout} className={`flex items-center text-sm font-medium ${textClass}`}>
                <LogOut className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
