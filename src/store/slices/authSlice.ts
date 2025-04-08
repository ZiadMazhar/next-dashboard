import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth"
import { auth } from "../../lib/firebase"

// Define the state interface
interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Define the payload types
interface AuthCredentials {
  email: string
  password: string
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

// Async thunks for Firebase authentication
export const signIn = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign in")
    }
  },
)

export const signUp = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign up")
    }
  },
)

export const signOut = createAsyncThunk<null, void, { rejectValue: string }>(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await firebaseSignOut(auth)
      return null
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign out")
    }
  },
)

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload
      state.loading = false
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Sign Out
    builder.addCase(signOut.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null
      state.loading = false
    })
    builder.addCase(signOut.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer
