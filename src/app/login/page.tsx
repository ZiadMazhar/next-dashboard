"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../hooks/useAuth"
import { LockIcon, UserIcon } from 'lucide-react'
import { CAlert } from '@coreui/react'
 


interface LoginForm {
  Email: string
  Password: string
  loading: boolean
  err: Array<{ msg: string }>
}

export default function LoginPage(): JSX.Element {
  const router = useRouter()
  const { login } = useAuth()
  const [loginData, setLogin] = useState<LoginForm>({
    Email: "",
    Password: "",
    loading: false,
    err: [],
  })

  const setError = (error: string | null) => {
    if (error === null) {
      setLogin({ ...loginData, err: [] })
    } else {
      setLogin({ ...loginData, err: [...loginData.err, { msg: error }] })
    }
  }

  const LoginFun = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogin({ ...loginData, loading: true, err: [] })
    
    try {
      await login(loginData.Email, loginData.Password)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Failed to login")
      setLogin(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-row items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="md:w-2/3">
            <div className="flex flex-col md:flex-row shadow-lg">
              <div className="bg-white p-8 rounded-l-lg w-full">
                <form onSubmit={LoginFun}>
                  <h1 className="text-2xl font-bold mb-2">Login</h1>
                  {loginData.err.map((error, index) => (
                    <CAlert key={index} variant="destructive" className="mb-4">
                      {error.msg}
                      <button 
                        className="ml-auto" 
                        onClick={() => {
                          const newErrors = [...loginData.err]
                          newErrors.splice(index, 1)
                          setLogin({ ...loginData, err: newErrors })
                        }}
                      >
                        ×   
                      </button>
                    </CAlert>
                  ))}
                  <p className=" font-medium text-gray-500 p-5">Sign In to your account</p>
                  
                  <div className="mb-4">
                    <div className="flex border rounded-md overflow-hidden">
                      <div className="bg-gray-100 p-3">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        className="p-2 w-full focus:outline-none"
                        value={loginData.Email}
                        onChange={(e) => setLogin({ ...loginData, Email: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex border rounded-md overflow-hidden">
                      <div className="bg-gray-100 p-3">
                        <LockIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        className="p-2 w-full focus:outline-none"
                        value={loginData.Password}
                        onChange={(e) => setLogin({ ...loginData, Password: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      type="submit"
                      disabled={loginData.loading}
                    >
                      {loginData.loading ? "Logging in..." : "Login"}
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-blue-600 text-white p-8 rounded-r-lg md:w-5/12 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2">Sign up</h2>
                  <p className="mb-4">
                    You don't have an account? Register Now!
                  </p>
                  <Link href="/register">
                    <button className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition">
                      Register Now!
                    </button>
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
