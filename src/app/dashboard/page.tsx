"use client"
import { useAuth } from "../../hooks/useAuth"
import { useAppSelector } from "@/redux/hooks"

export default function Dashboard(): JSX.Element {
  const { user } = useAuth()
  const darkMode = useAppSelector((state) => state.ui.darkMode)
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white"
  const headingClass = darkMode ? "text-white" : "text-gray-900"
  const textClass = darkMode ? "text-gray-300" : "text-gray-600"

  return (
    <div>
      <h1 className={`text-2xl font-bold mb-6 ${headingClass}`}>Dashboard</h1>

      <div className={`${cardBgClass} shadow rounded-lg p-6`}>
        <h2 className={`text-xl font-semibold mb-4 ${headingClass}`}>Welcome back!</h2>
        {user && (
          <p className={textClass}>
            You are logged in as: <span className="font-medium">{user.email}</span>
          </p>
        )}
        <p className={`mt-4 ${textClass}`}>Use the sidebar to navigate to different sections of the dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className={`${cardBgClass} shadow rounded-lg p-6`}>
          <h3 className={`font-semibold mb-2 ${headingClass}`}>Table View</h3>
          <p className={textClass}>View and manage data in a dynamic table.</p>
        </div>

        <div className={`${cardBgClass} shadow rounded-lg p-6`}>
          <h3 className={`font-semibold mb-2 ${headingClass}`}>Charts</h3>
          <p className={textClass}>Visualize your data with interactive charts.</p>
        </div>

        <div className={`${cardBgClass} shadow rounded-lg p-6`}>
          <h3 className={`font-semibold mb-2 ${headingClass}`}>Account Settings</h3>
          <p className={textClass}>Manage your account and preferences.</p>
        </div>
      </div>
    </div>
  )
}
