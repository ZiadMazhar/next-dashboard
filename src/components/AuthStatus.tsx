"use client"

import { useAuth } from "../hooks/useAuth"
import { useAppDispatch, useAppSelector } from "../store"
import { toggleDarkMode } from "../store/slices/uiSlice"

export default function AuthStatus(): JSX.Element {
  const { user, loading, error, logout, login } = useAuth()
  const darkMode = useAppSelector((state) => state.ui.darkMode)
  const dispatch = useAppDispatch()

  const handleLogin = (): void => {
    login("Ziad255599@gmail.com", "12909072")
  }

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Authentication Status</h2>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={() => logout()} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <button onClick={handleLogin} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Login (Demo)
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        <button onClick={() => dispatch(toggleDarkMode())} className="px-4 py-2 bg-gray-200 rounded">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <p className="mt-2">Current theme: {darkMode ? "Dark" : "Light"}</p>
      </div>
    </div>
  )
}
