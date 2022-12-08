import { collectionGroup, getDocs, getFirestore, limit, query, where } from "firebase/firestore"
import { useRouter } from "next/router"
import { useState } from "react"
import { DirectorsToJSON } from "../../lib/firebase"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { id } = context.query
    const ref = collectionGroup(getFirestore(), "actors")
    const actorQuery = query(
        ref,
        where("name", "==", id),
        limit(1)
    )

    const actor = (await getDocs(actorQuery)).docs.map(DirectorsToJSON)

    return {
        props: { actor }
    }
}

export default function Actor(props: any) {
    const [actor, setActor] = useState(props.actor[0])


    return (
        <main className="flex justify-center flex-col items-center gap-2">
            <h1 className="font-poppins font-semibold text-7xl">{actor?.name}</h1>
            <Image src={actor?.photoURL} alt="Actor's Picture" width={300} height={300} />
        </main>
    )
}