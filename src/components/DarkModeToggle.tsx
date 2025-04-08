"use client"

import { useAppDispatch, useAppSelector } from "../store"
import { toggleDarkMode } from "../store/slices/uiSlice"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export default function DarkModeToggle(): JSX.Element {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.ui.darkMode)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    dispatch(toggleDarkMode())
    console.log("Toggle clicked, new state should be:", !darkMode)

  
  }

  if (!mounted) {
    return <div className="w-10 h-10"></div> 
  }

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full ${
        darkMode ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  )
}
