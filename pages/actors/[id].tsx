import { useRouter } from "next/router"

export default function Actor() {
    const router = useRouter()
    const { id } = router.query

    return (
        <main>
            {id}
        </main>
    )
}