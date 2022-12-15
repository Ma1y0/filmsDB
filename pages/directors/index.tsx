import { collectionGroup, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore"
import { DirectorsToJSON } from "../../lib/firebase"
import { useState } from "react"
import DirectorsList from "../../components/DirectorsList"
import Link from "next/link"

const limitC = 200

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const ref = collectionGroup(getFirestore(), "directors")
    const directorsQuery = query(
        ref,
        orderBy('createdAt', 'desc'),
        limit(limitC)
    )

    const directors = (await getDocs(directorsQuery)).docs.map(DirectorsToJSON)

    return {
        props: { directors }
    }
}  

export default function Directors(props: any) {
    const [directors, setDirectors] = useState(props.directors)

    return (
        <main className="flex justify-center">
            <DirectorsList directors={directors} admin={false} />
        </main>
    )
}