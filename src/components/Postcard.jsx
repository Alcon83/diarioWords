"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns'; // Asegúrate de tener date-fns instalado para formatear la fecha

function PostCard({ post, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="my-4 bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transition-all duration-300">
            <div className="cursor-pointer" onClick={toggleAccordion}>
                {post.imageUrl && (
                    <img src={post.imageUrl} alt="Post image" className="w-full object-cover h-64" />
                )}
                <div className="p-4">
                    <h3 className="font-bold text-xl">{post.title}</h3>
                </div>
            </div>
            {isOpen && (
                <div className="bg-gray-700 px-4 py-4">
                    <p className="mb-2">SEO: {post.seo}</p>
                    <p>Contenido: {post.content}</p>
                    <div className="flex justify-between items-center mt-4 text-gray-400">
                        <span>
                            {format(new Date(post.createdAt), 'PPP')}
                        </span>
                        <button onClick={() => router.push(`/dashboard/posts/edit/${post.id}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <FaEdit />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostCard;
