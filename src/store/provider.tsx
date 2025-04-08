"use client"

import { Provider } from "react-redux"
import { store } from "./index"
import { type ReactNode, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../lib/firebase"
import { setUser } from "./slices/authSlice"

interface ReduxProviderProps {
  children: ReactNode
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      store.dispatch(setUser(user))
    })

    return () => unsubscribe()
  }, [])

  return <Provider store={store}>{children}</Provider>
}
