import { useRouter } from "next/router"

export default function Film() {
    const router = useRouter()
    const { id } = router.query

    return (
        <main>
            {id}
        </main>
    )
}