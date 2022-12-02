import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'
import { UserContext } from "../lib/context"
import { useUserData } from "../lib/hooks" 

export default function App({ Component, pageProps }: AppProps) {
  const userData = useUserData()

  return (
    // debug-screens
    <div className="">
      <UserContext.Provider value={userData}>
        <NavBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </div>
  )
}
