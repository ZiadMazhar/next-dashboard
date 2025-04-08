import type { User as FirebaseUser } from "firebase/auth"
import type { DocumentData } from "firebase/firestore"

export interface FirestoreDocument extends DocumentData {
  id: string
  createdAt?: Date
  updatedAt?: Date
}
