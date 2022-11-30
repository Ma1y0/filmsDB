import { useRouter } from 'next/router'
export default function user() {
    const router = useRouter()
    const { id } = router.query

    return (
        <main>
            Hello User {id}
        </main>
    )
}