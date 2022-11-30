import Image from "next/image"
import google from "../public/google.png"
import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../lib/context"
import { debounce } from "lodash"
import { auth, googleAuthProvider } from "../lib/firebase"
import { signOut, signInWithPopup, signInAnonymously } from "firebase/auth"
import { getDoc, doc, getFirestore, writeBatch } from "firebase/firestore"

export default function Login(props: any) {
    const { user, username } = useContext(UserContext)

    return (
        <main className="flex justify-center mt-5">
          {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
        </main>
    )
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  return (
      <button className="btn bg-googlegray" onClick={signInWithGoogle}>
        <Image className="mr-[10px]" src={google} alt="Google logo" width={30} height={30} /> Sign in with Google
      </button>
  )
}

function SignOutButton() {
  return (
      <button className="btn bg-googlegray" onClick={() => signOut(auth)}>Sign Out</button>
  )
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user, username } = useContext(UserContext)


  const onChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const val = target.value
      const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

      if (val.length < 3) {
          setFormValue(val)
          setIsLoading(false)
          setIsValid(false)
      }

      if (regex.test(val)) {
          setFormValue(val)
          setIsLoading(true)
          setIsValid(false)
      }
  }

  useEffect(() => {
      checkUsername(formValue);
    }, [formValue])

  const checkUsername = useCallback(
      debounce(async (username) => {
          if (username.length >= 3) {
              const ref = doc(getFirestore(), 'usernames', username)
              const snap = await getDoc(ref)
              console.log('Firestore read executed!', snap.exists())
              setIsValid(!snap.exists())
              setIsLoading(false)
          }
      }, 500),
  []
  )

  const onSubmit = async (e: Event) => {
      e.preventDefault()
  
      try {
          const userDoc = doc(getFirestore(), "users", user.uid)
          const usernameDoc = doc(getFirestore(), "username", formValue)
      
          const batch = writeBatch(getFirestore())
          batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName})
          batch.set(usernameDoc, {uid: user.uid})
      
          await batch.commit()
      } catch (error) {
          console.log(error)
      }
    }
       

    return (
        !username && (
          <section>
            <h3 className="font-poppins font-semibold ss:text-[52px] text-[46px]">Choose Username</h3>
            <form className="flex justify-center" onSubmit={onSubmit}>
              <input className="" name="username" placeholder="username" value={formValue} onChange={onChange} />
              <button type="submit" className="bg-submit btn" disabled={!isValid}>
                Choose
              </button>
              <br />
            </form>
              <UsernameMassage className="flex justify-center" username={formValue} isValid={isValid} isloading={isLoading} />
          </section>
        )
      )
}

function UsernameMassage({ username, isValid, isLoading }: any) {
    if (isLoading) {
      return <p>Checking ...</p>
    } else if (isValid) {
      return <p className="text-succes">{username} is avilible!</p>
    } else if (username && !isValid) {
      return <p className="text-danger">This user name is taken!</p>
    } else {
      return <p></p>
    }
  }