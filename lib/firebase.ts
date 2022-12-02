import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, getDoc, where, getDocs, query, limit } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    ******* API KEY *******
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

// Auth Exports
export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

// Firestore Exports
export const firestore = getFirestore(firebaseApp)

// Storage Exports
export const storage = getStorage(firebaseApp)

// Server Time
// export const serverTime = 
