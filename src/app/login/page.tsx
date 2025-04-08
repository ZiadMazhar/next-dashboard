"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../hooks/useAuth"
import { User, LockKeyhole } from "lucide-react"

export default function LoginPage(): JSX.Element {
  const router = useRouter()
  const { login, loginWithGoogle, user, loading, error: authError } = useAuth()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    loading: false,
    err: [] as { msg: string }[],
  })

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const setError = (error: string | null) => {
    if (error) {
      setLoginData({
        ...loginData,
        err: [...loginData.err, { msg: error }],
      })
    } else {
      setLoginData({
        ...loginData,
        err: [],
      })
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginData({ ...loginData, loading: true, err: [] })

    try {
      await login(loginData.email, loginData.password)
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to login")
      setLoginData({ ...loginData, loading: false })
    }
  }

  const handleGoogleLogin = async () => {
    setLoginData({ ...loginData, loading: true, err: [] })

    try {
      console.log("Initiating Google login...")
      await loginWithGoogle()
    } catch (error: any) {
      console.error("Google login error:", error)
      setError(error.message || "Failed to login with Google")
      setLoginData({ ...loginData, loading: false })
    }
  }

  if (loading || (user && !loginData.loading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-row items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="md:w-4/5 lg:w-3/4">
            <div className="flex flex-col md:flex-row shadow-lg">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-l-lg w-full md:w-7/12">
                <form onSubmit={handleLogin}>
                  <h1 className="text-2xl font-bold mb-2 dark:text-white">Login</h1>

                  {loginData.err.map((error, index) => (
                    <div
                      key={index}
                      className="mb-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded relative"
                      role="alert"
                    >
                      {error.msg}
                      <button
                        className="absolute top-0 right-0 p-2"
                        onClick={() => setLoginData({ ...loginData, err: loginData.err.filter((_, i) => i !== index) })}
                      >
                        &times;
                      </button>
                    </div>
                  ))}

                  <p className="text-gray-600 dark:text-gray-300 mb-6">Sign In to your account</p>

                  <div className="mb-4">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                        <User size={18} />
                      </span>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        className="flex-1 appearance-none border border-gray-300 dark:border-gray-600 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                        <LockKeyhole size={18} />
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        className="flex-1 appearance-none border border-gray-300 dark:border-gray-600 w-full py-2 px-4 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <button
                      type="submit"
                      disabled={loginData.loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50"
                    >
                      {loginData.loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                      <span className="flex-shrink mx-4 text-gray-600 dark:text-gray-400">or</span>
                      <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={loginData.loading}
                      className="flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-2 px-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:shadow-outline hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150 ease-in-out disabled:opacity-50"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-blue-600 text-white p-8 rounded-r-lg w-full md:w-5/12 flex items-center">
                <div className="text-center w-full">
                  <h2 className="text-2xl font-bold mb-2">Sign up</h2>
                  <p className="mb-6">You don't have an account? Register Now!</p>
                  <Link
                    href="/register"
                    className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Register Now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
