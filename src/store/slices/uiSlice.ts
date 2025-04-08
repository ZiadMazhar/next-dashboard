import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Define the state interface
interface UiState {
  isLoading: boolean
  darkMode: boolean
  notifications: string[]
}

// Initial state
const initialState: UiState = {
  isLoading: false,
  darkMode: false,
  notifications: [],
}

// Create the UI slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
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
