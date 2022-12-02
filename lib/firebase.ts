import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, getDoc, where, getDocs, query, limit } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  ***** API key *****
}

// Initialize Firebase
function createFirebaseApp(config: any) {
    try {
        return getApp()
    } catch (error) {
        return initializeApp(config)
    }
}

const firebaseApp = createFirebaseApp(firebaseConfig)

// Auth exports
export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

// Firestore exports
export const firestore = getFirestore(firebaseApp)

// Storage exports
export const storage = getStorage(firebaseApp)
