import { collectionGroup, doc, getDocs, getFirestore, limit, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore"
import { DirectorsToJSON } from "../../lib/firebase"
import { useState } from "react"
import DirectorsList from "../../components/DirectorsList"
import Link from "next/link"

const limitC = 200

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const ref = collectionGroup(getFirestore(), "directors")
    const directorsQuery = query(
        ref,
        orderBy('createdAt', 'desc'),
        limit(limitC)
    )

    const directors = (await getDocs(directorsQuery)).docs.map(DirectorsToJSON)

    return {
        props: { directors }
    }
}

export default function Admin() {
    const [formData, setFormData] = useState({
        name: "",
        posterURL: "",
        director: "",
        actor: "",
        actors: []
    })

    const { name, posterURL, director, actors, actor } = formData 

    const onChange = (e: Event) => {
        const target = e.target as HTMLInputElement
            setFormData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }))
    }

    const onActorAdd = (e: Event) => {
        setFormData((prevState) => ({
            ...prevState,
            actors: [...prevState.actors, prevState.actor],
            actor: ""
        }))
    }

    const onSubmit = async (e: Event) => {
        e.preventDefault()

        try {
            await setDoc(doc(getFirestore(), "films", formData.name), {
                name: formData.name,
                posterURL: formData.posterURL,
                director: formData.director,
                actors: formData.actors,
                createdAt: serverTimestamp()
            })

            setFormData({
                name: "",
                posterURL: "",
                director: "",
                actor: "",
                actors: []
            })

        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <main onSubmit={onSubmit}>
            <form>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input value={name} onChange={onChange} id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="poster" className="block mb-2 text-sm font-medium text-gray-900">Poster</label>
                    <input value={posterURL} onChange={onChange} id="posterURL" name="posterURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="director" className="block mb-2 text-sm font-medium text-gray-900">Director</label>
                    <input value={director} onChange={onChange} id="director" name="director" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="actors" className="block mb-2 text-sm font-medium text-gray-900">Actor</label>
                    <div className="flex">
                        <input value={actor} onChange={onChange} id="actor" name="actor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        <button type="button" onClick={onActorAdd} className="ml-5 mr-5">+</button>
                    </div>
                    <ul>
                        {formData.actors.map(artist => (
                        <li key={artist}>{artist}</li>
                        ))}
                    </ul>
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </main>
    )
}