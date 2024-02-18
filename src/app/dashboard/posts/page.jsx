"use client";
import React, { useEffect, useState } from 'react';
import PostCard from './Postcard'; // Asegúrate de ajustar la ruta de importación según tu estructura
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa'
function BlogPage() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } else {
        console.error('Error al cargar los posts:', res.statusText);
        // Opcionalmente, puedes manejar el error mostrando un mensaje en la UI, etc.
      }
    };

    fetchPosts();
  }, []); // El arreglo vacío indica que este efecto se ejecuta solo una vez, cuando el componente se monta

  const navigateToCreatePost = () => router.push('/dashboard/posts/create');

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className='pt-4'>
          <button
            onClick={navigateToCreatePost}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded shadow-lg cursor-pointer"
          >
            <FaPlus className="mr-2" /> Crear Post
          </button>

        </div>
      </div>
      <div>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-2 px-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p>No se encontraron posts.</p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
