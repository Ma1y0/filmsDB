import { collectionGroup, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore"
import { DirectorsToJSON } from "../../lib/firebase"
import { useState } from "react"
import ActorsList from "../../components/ActorsList"
import Link from "next/link"

const limitC = 200

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const ref = collectionGroup(getFirestore(), "actors")
    const actorsQuery = query(
        ref,
        orderBy('createdAt', 'desc'),
        limit(limitC)
    )

    const actors = (await getDocs(actorsQuery)).docs.map(DirectorsToJSON)

    return {
        props: { actors }
    }
}  

export default function Actors(props: any) {
    const [directors, setDirectors] = useState(props.actors)

    return (
        <main className="flex justify-center">
            <ActorsList directors={directors} admin={false} />
        </main>
    )
}