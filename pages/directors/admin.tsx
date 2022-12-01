import { useState } from 'react'
import { doc, setDoc, getFirestore, Timestamp } from 'firebase/firestore';

export default function admin() {
    const [directorName, setDirectorName] = useState("")

    const onChange = (e: Event) => {
        const target = e.target as HTMLInputElement
        const val = target.value
        setDirectorName(val)
    }

    const onSubmit = async (e: Event) => {
        e.preventDefault()

        try {
            await setDoc(doc(getFirestore(), "directors", directorName), {
                name: directorName,
                createdAt: Timestamp.fromDate(new Date())
            })

            setDirectorName("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <form onSubmit={onSubmit} className="flex items-center flex-col">
                <h3>Add add director:</h3>
                <div>
                <input value={directorName} onChange={onChange} className="mt-5 h-[30px]" placeholder="Director's Name" required/>
                <button type="submit" className="bg-submit btn">Add</button>
                </div>
            </form>
        </main>
    )
}