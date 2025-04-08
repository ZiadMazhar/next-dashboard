import { configureStore } from "@reduxjs/toolkit"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// Import reducers (we'll create these next)
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uislice"

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,  
    ui: uiReducer,
  },
  // Add middleware or other configurations as needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types (useful for Firebase objects that might not be serializable)
        ignoredActions: ["auth/setUser"],
        // Ignore these field paths in state
        ignoredPaths: ["auth.user"],
      },
    }),
})

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create typed hooks for better TypeScript support
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
