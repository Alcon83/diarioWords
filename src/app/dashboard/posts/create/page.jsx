"use client";
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function CreatePost({ params }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [seo, setSeo] = useState("");
    const [imageUrl, setImageUrl] = useState("https://picsum.photos/940/380");

    useEffect(() => {
        if (params.id) {
            fetch(`/api/posts/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setContent(data.content);
                    setSeo(data.seo);
                    setImageUrl(data.imageUrl || "");
                }).catch(err => console.error("Error al cargar el post:", err));
        }
    }, [params.id, router]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const method = params.id ? 'PUT' : 'POST';
        const res = await fetch(`/api/posts/${params.id || ''}`, {
            method,
            body: JSON.stringify({ title, content, seo, imageUrl }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push('/dashboard/posts');
        } else {
            console.error('Error al guardar el post');
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <form className='bg-gray-800 text-gray-200 p-10 rounded-lg shadow-xl w-3/4 ' onSubmit={onSubmit}>
                <h2 className="text-xl font-bold mb-6">{params.id ? "Actualizar Post" : "Crear Nuevo Post"}</h2>
                <div className="mb-4">
                    <label htmlFor='title' className='block font-bold text-sm mb-2'>Título del Post</label>
                    <input
                        type="text"
                        id="title"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Título'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='content' className='block font-bold text-sm mb-2'>Contenido del Post</label>
                    <textarea
                        id="content"
                        cols="30"
                        rows="5"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='Contenido'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor='seo' className='block font-bold text-sm mb-2'>SEO Descripción</label>
                    <input
                        type="text"
                        id="seo"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='SEO Descripción'
                        onChange={(e) => setSeo(e.target.value)}
                        value={seo}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor='imageUrl' className='block font-bold text-sm mb-2'>URL de la Imagen</label>
                    <input
                        type="text"
                        id="imageUrl"
                        className='bg-gray-700 w-full text-white rounded p-2 focus:outline-none focus:ring focus:ring-blue-500'
                        placeholder='URL de la Imagen'
                        onChange={(e) => setImageUrl(e.target.value)}
                        value={imageUrl}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <button type="submit" className='px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded transition-colors duration-200'>
                        {params.id ? "Actualizar" : "Crear"}
                    </button>
                    {params.id && (
                        <button onClick={async () => {
                            const res = await fetch(`/api/posts/${params.id}`, { method: 'DELETE' });
                            if (res.ok) router.push('/dashboard/posts');
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

export default CreatePost;
