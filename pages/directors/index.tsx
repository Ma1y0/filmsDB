import { query, collection, getFirestore, getDocs } from 'firebase/firestore';
import { useState } from 'react'

export default function directors() {
    const [directors, setdirectors] = useState()

    const getDirectors = async () => {
        const q = query(collection(getFirestore(), "directors"))
        const querySnapshot = await getDocs(q)
        setdirectors(querySnapshot)
    }

    try {
        return (
            <main>
                <button onClick={getDirectors}>Hello</button>
                {directors.forEach((element: any) => {
                    <p>{element.name}</p>
                })}
            </main>
        )

    } catch (error) {
        return <button onClick={getDirectors}>Hello</button>
    }
}