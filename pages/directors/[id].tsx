import { useRouter } from "next/router"

export default function Director() {
    const router = useRouter()
    const { id } = router.query

    return (
        <main>{id}</main>
    )
}