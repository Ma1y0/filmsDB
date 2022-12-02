// import { collectionGroup, getFirestore, query, limit, getDocs } from "firebase/firestore"
// import { GetServerSideProps } from "next"

import Link from "next/link"

// const limitConst = 10

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const ref = collectionGroup(getFirestore(), "directors")
//     const directorsQuery = query(
//         ref,
//         limit(limitConst)
//     )

//     const directors = (await getDocs(directorsQuery))

//     return {
//         props: directors || {}
//     }
// }

export default function directors() {
    return (
        <main>
            <meta title="Direcors" />
            <Link href="/directors/admin">
                <button>Admin</button>
            </Link>
        </main>
    )
}
