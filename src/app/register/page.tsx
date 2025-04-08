"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../hooks/useAuth"
import { LockIcon, UserIcon, PhoneIcon } from 'lucide-react'
import { CAlert } from '@coreui/react'

interface RegisterForm {
  Email: string
  Phone: string
  Password: string
  confirmPassword: string
  loading: boolean
  err: Array<{ msg: string }>
}

export default function RegisterPage(): JSX.Element {
  const router = useRouter()
  const { register } = useAuth()
  const [registerData, setRegister] = useState<RegisterForm>({
    Email: "",
    Phone: "",
    Password: "",
    confirmPassword: "",
    loading: false,
    err: [],
  })

  const setError = (error: string | null) => {
    if (error === null) {
      setRegister({ ...registerData, err: [] })
    } else {
      setRegister({ ...registerData, err: [...registerData.err, { msg: error }] })
    }
  }

  const RegisterFun = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (registerData.Password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    setRegister({ ...registerData, loading: true, err: [] })
    
    try {
      await register(registerData.Email, registerData.Password)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Failed to register")
      setRegister(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-row items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="md:w-2/3 lg:w-1/2 xl:w-5/12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={RegisterFun}>
                <h1 className="text-2xl font-bold mb-2">Register</h1>
                {registerData.err.map((error, index) => (
                  <CAlert key={index} variant="destructive" className="mb-4">
                    {error.msg}
                    <button 
                      className="ml-auto" 
                      onClick={() => {
                        const newErrors = [...registerData.err]
                        newErrors.splice(index, 1)
                        setRegister({ ...registerData, err: newErrors })
                      }}
                    >
                      ×
                    </button>
                  </CAlert>
                ))}
                <p className="text-gray-500 mb-4">Create your account</p>
                
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
                      value={registerData.Email}
                      onChange={(e) => setRegister({ ...registerData, Email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-3 whitespace-nowrap">
                      +02
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className="p-2 w-full focus:outline-none"
                      value={registerData.Phone}
                      onChange={(e) => setRegister({ ...registerData, Phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <div className="bg-gray-100 p-3">
                      <LockIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      className="p-2 w-full focus:outline-none"
                      value={registerData.Password}
                      onChange={(e) => setRegister({ ...registerData, Password: e.target.value })}
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
                      placeholder="Repeat password"
                      required
                      className="p-2 w-full focus:outline-none"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegister({ ...registerData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <button
                    className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
                    type="submit"
                    disabled={registerData.loading}
                  >
                    {registerData.loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
