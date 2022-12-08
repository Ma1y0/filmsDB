import { collectionGroup, getDocs, getFirestore, limit, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { DirectorsToJSON } from "../../lib/firebase"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { id } = context.query
    const ref = collectionGroup(getFirestore(), "directors")
    const directorQuery = query(
        ref,
        where("name", "==", id),
        limit(1)
    )

    const director = (await getDocs(directorQuery)).docs.map(DirectorsToJSON)

    return {
        props: { director }
    }
}

export default function Director(props: any) {
    const [director, setDirector] = useState(props.director[0])


    return (
        <main>
            <h1>{director.name}</h1>
        </main>
    )
}