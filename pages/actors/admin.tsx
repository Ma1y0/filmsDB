import { useState } from 'react'
import { doc, setDoc, getFirestore, Timestamp } from 'firebase/firestore'

export default function Admin() {
    const [actorName, setActorName] = useState("")
    const [actorPhoto, setActorPhoto] = useState("")

    const onChangeName = (e: Event) => {
        const target = e.target as HTMLInputElement
        const val = target.value
        setActorName(val)
    }

    const onChangePhoto = (e: Event) => {
        const target = e.target as HTMLInputElement
        const val = target.value
        setActorPhoto(val)
    }


    const onSubmit = async (e: Event) => {
        e.preventDefault()

        try {
            await setDoc(doc(getFirestore(), "actors", actorName), {
                name: actorName,
                photoURL: actorPhoto,
                createdAt: Timestamp.fromDate(new Date())
            })

            setActorName("")
            setActorPhoto("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <form onSubmit={onSubmit}>
            <div className="mb-6">
                <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Actor's Name</label>
                <input value={actorName} onChange={onChangeName} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-6">
                <label for="photo" class="block mb-2 text-sm font-medium text-gray-900">Actor's Photo URL</label>
                <input value={actorPhoto} id="photo" onChange={onChangePhoto} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 required" />
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </main>
    )
}