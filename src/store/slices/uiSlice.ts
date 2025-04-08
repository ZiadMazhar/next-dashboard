import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface UiState {
  isLoading: boolean
  darkMode: boolean
  notifications: string[]
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true"
  }
  return false
}


const initialState: UiState = {
  isLoading: false,
  darkMode: getInitialDarkMode(),
  notifications: [],
}


const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (typeof window !== "undefined") {
        localStorage.setItem("darkMode", state.darkMode.toString())
      }
    },
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload)
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter((_, index) => index !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const { setLoading, toggleDarkMode, addNotification, removeNotification, clearNotifications } = uiSlice.actions

export default uiSlice.reducer
