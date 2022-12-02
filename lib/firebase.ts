import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, getDoc, where, getDocs, query, limit } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBl_Zn7Gt_aRmgq37hTFHyvIQUQWRr_gMY",
    authDomain: "filmsdb-ac4ea.firebaseapp.com",
    projectId: "filmsdb-ac4ea",
    storageBucket: "filmsdb-ac4ea.appspot.com",
    messagingSenderId: "917088895621",
    appId: "1:917088895621:web:c5e062f7a19357030a5fec",
    measurementId: "G-FJPB8KZZ4V"
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