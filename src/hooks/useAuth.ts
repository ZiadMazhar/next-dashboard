"use client"

import { useAppDispatch, useAppSelector } from "../store"
import { signIn, signUp, signOut } from "../store/slices/authSlice"
import type { User } from "../types/firebase"

interface AuthHookResult {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  logout: () => Promise<any>
  isAuthenticated: boolean
}

export const useAuth = (): AuthHookResult => {
  const dispatch = useAppDispatch()
  const { user, loading, error } = useAppSelector((state) => state.auth)

  const login = async (email: string, password: string) => {
    return dispatch(signIn({ email, password }))
  }

  const register = async (email: string, password: string) => {
    return dispatch(signUp({ email, password }))
  }

  const logout = async () => {
    return dispatch(signOut())
  }

  return {
    user: user as User | null,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}
