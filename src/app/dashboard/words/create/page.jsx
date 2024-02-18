"use client"
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
function CreateWord({ params }) {

    const router = useRouter()
    const [word, setWord] = useState("")
    const [definition, setDefinition] = useState("")
    const [example, setExample] = useState("")
    const [use, setUse] = useState("")

    useEffect(() => {
        if (params.id) {
            fetch(`/api/words/${params.id}`)
                .then(res => res.json())
                .then((data) => {
                    setWord(data.word)
                    setDefinition(data.definition)
                    setExample(data.example)
                    setUse(data.use)
                })
        }

    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()
        if (params.id) {
            const res = await fetch(`/api/words/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ word, definition, example, use }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json()

            console.log(data)
        } else {
            const res = await fetch('/api/words', {
                method: 'POST',
                body: JSON.stringify({ word, definition, example, use }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()

        }
        router.refresh()
        router.push('/dashboard/words')
    }
    return (
        <div className='h-screen flex justify-center items-center'>
            <form className='bg-gray-800 text-gray-200 p-10 rounded-lg shadow-xl w-3/4 ' onSubmit={onSubmit}>
                <h2 className="text-xl font-bold mb-6">{params.id ? "Actualizar Palabra" : "Crear Nueva Palabra"}</h2>
                <div className="mb-4">
                    <label htmlFor='word' className='block font-bold text-sm mb-2'>Palabra</label>
                    <input
                        type="text"
                        id="word"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Palabra'
                        onChange={(e) => setWord(e.target.value)}
                        value={word}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='definition' className='block font-bold text-sm mb-2'>Definición</label>
                    <textarea
                        id="definition"
                        cols="30"
                        rows="3"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Definición'
                        onChange={(e) => setDefinition(e.target.value)}
                        value={definition}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor='example' className='block font-bold text-sm mb-2'>Ejemplos de Uso</label>
                    <textarea
                        id="example"
                        cols="30"
                        rows="3"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Ejemplos de uso'
                        onChange={(e) => setExample(e.target.value)}
                        value={example}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor='use' className='block font-bold text-sm mb-2'>Hashtags</label>
                    <input
                        type="text"
                        id="use"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Hashtags'
                        onChange={(e) => setUse(e.target.value)}
                        value={use}
                    />
                </div>
                <div className='flex justify-between'>
                    <button type="submit" className='px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition-colors duration-200'>
                        {params.id ? "Actualizar" : "Crear"}
                    </button>
                    {params.id && (
                        <button onClick={async () => {
                            const res = await fetch(`/api/words/${params.id}`, { method: 'DELETE' });
                            if (res.ok) router.push('/dashboard/words');
                        }} className='px-4 py-2 bg-red-500 hover:bg-red-700 rounded transition-colors duration-200'
                            type="button">
                            Eliminar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreateWord