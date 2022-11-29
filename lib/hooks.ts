/* eslint-disable react-hooks/rules-of-hooks */
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestore } from "./firebase"
import { doc, onSnapshot, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"

export function useUserData() {
    const [user] = useAuthState(auth)
    const [username, setUserName] = useState(null)

    useEffect(() => {
        let unsubscribe

        if (user) {
            const ref = doc(getFirestore(), "users", user.uid)
            unsubscribe = onSnapshot(ref, (doc) => {
                setUserName(doc.data()?.usernam)
            })
        } else {
            setUserName(null)
        }

        return unsubscribe
    }, [user])

    return {user, username} 
}