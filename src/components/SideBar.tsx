"use client"
import "../app/styles.css"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3Icon, TableIcon, MenuIcon, XIcon, LogOutIcon } from 'lucide-react'
import { useAuth } from "../hooks/useAuth"

interface NavItem {
  name: string
  to: string
  icon: React.ReactNode
}

export default function Sidebar(): JSX.Element {
  const [sidebarShow, setSidebarShow] = useState(false)
  const [unfoldable, setUnfoldable] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarShow(false)
  }, [pathname])

  const navItems: NavItem[] = [
    {
      name: "Dashboard Table",
      to: "/dashboard",
      icon: <TableIcon className="h-5 w-5" />,
    },
    {
      name: "Dashboard Charts",
      to: "/dashboard/charts",
      icon: <BarChart3Icon className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarShow(!sidebarShow)}
      >
        {sidebarShow ? (
          <XIcon className="h-6 w-6 text-gray-700" />
        ) : (
          <MenuIcon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar backdrop for mobile */}
      {sidebarShow && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarShow(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          sidebarShow ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${unfoldable ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className={`${unfoldable ? 'hidden md:block' : 'block'} text-xl font-bold`}>
            {!unfoldable ? 'Dashboard' : 'D'}
          </div>
          <button
            className="hidden md:block text-gray-400 hover:text-white"
            onClick={() => setUnfoldable(!unfoldable)}
          >
            {unfoldable ? '→' : '←'}
          </button>
        </div>

        {/* Nav items */}
        <div className="py-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.to}
                  className={`flex items-center px-4 py-3 ${
                    pathname === item.to ? 'bg-gray-700' : 'hover:bg-gray-700'
                  } transition-colors`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!unfoldable && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="flex items-center w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors"
              >
                <span className="mr-3"><LogOutIcon className="h-5 w-5" /></span>
                {!unfoldable && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
