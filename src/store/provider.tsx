"use client"

import { Provider } from "react-redux"
import { store } from "./index"
import { type ReactNode, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../lib/firebase"
import { setUser } from "./slices/authSlice"
import ThemeProvider from "../components/ThemeProvider"


interface ReduxProviderProps {
  children: ReactNode
}

export function ReduxProvider({ children }: ReduxProviderProps): JSX.Element {
  useEffect(() => {
    

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        store.dispatch(setUser(user))
      },
      (error) => {
        console.error("Auth state change error:", error)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  )
}
