import type { User as FirebaseUser } from "firebase/auth"
import type { DocumentData } from "firebase/firestore"

// Extend Firebase User type if needed
export interface User extends FirebaseUser {
  // Add any additional user properties you might need
}

// Define a type for Firestore documents
export interface FirestoreDocument extends DocumentData {
  id: string
  createdAt?: Date
  updatedAt?: Date
}
