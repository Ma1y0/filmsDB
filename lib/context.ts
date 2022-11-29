import { createContext } from "react"

type userContexType = {
    user: object;
    username: string;
}

const userContextDefaultValue: userContexType = {
    user: {},
    username: ""
}

export const UserContext = createContext<userContexType>(userContextDefaultValue)