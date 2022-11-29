import { createContext } from "react"

type userContexType = {
    user: any;
    username: any;
}

const userContextDefaultValue: userContexType = {
    user: null,
    username: null
}

export const UserContext = createContext<userContexType>(userContextDefaultValue)