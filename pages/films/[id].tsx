import { collectionGroup, getDocs, getFirestore, limit, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { DirectorsToJSON } from "../../lib/firebase"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { id } = context.query
    const ref = collectionGroup(getFirestore(), "films")
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
        <main className="flex justify-center flex-col items-center gap-2">
            <h1 className="font-poppins font-semibold text-7xl">{director?.name}</h1>
            <Image src={director?.photoURL} alt="Film's Poster" width={300} height={300} />
        </main>
    )
}