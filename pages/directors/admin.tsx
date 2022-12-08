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
            <form>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 required" />
            </div>
            <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </main>
    )
}