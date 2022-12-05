import { collectionGroup } from "firebase/firestore"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const ref = collectionGroup()
}

export default function Director() {
    const router = useRouter()
    const { id } = router.query

    return (
        <main>{id}</main>
    )
}