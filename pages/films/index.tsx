import { collectionGroup, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore"
import { DirectorsToJSON } from "../../lib/firebase"
import { useState } from "react"
import Link from "next/link"
import FilmsList from "../../components/FilmsList"

const limitC = 200

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const ref = collectionGroup(getFirestore(), "films")
    const filmsQuery = query(
        ref,
        orderBy('createdAt', 'desc'),
        limit(limitC)
    )

    const films = (await getDocs(filmsQuery)).docs.map(DirectorsToJSON)

    return {
        props: { films }
    }
}  

export default function Films(props: any) {
    const [films, setFilms] = useState(props.films)

    return (
        <main className="flex justify-center">
            <FilmsList films={films} admin={false} />
        </main>
    )
}