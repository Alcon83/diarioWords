'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de corregir el importe aquí
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from 'react-icons/fa';

function WordCard({ word, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <>
            <tr className="bg-gray-800 hover:bg-gray-700 transition-colors ease-in-out duration-150">
                <td className="p-4">
                    <div className="flex items-center">
                        <button onClick={toggleAccordion} className="text-gray-400 mr-4">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        <span className="text-white font-medium">{word.word}</span>
                    </div>
                </td>
                <td className="p-4 text-gray-400">{word.definition}</td>
                <td className="p-4 text-gray-400">{word.use}</td>
                <td className="p-4 text-right">
                    <button onClick={() => router.push(`/dashboard/words/edit/${word.id}`)} className="text-blue-500 hover:text-blue-400 mr-2">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(word.id)} className="text-red-500 hover:text-red-400">
                        <FaTrash />
                    </button>
                </td>
            </tr>
            {isOpen && (
                <tr className="bg-gray-700 ">
                    <td colSpan="3" className="px-4 py-2 text-gray-300 ">
                        {word.example && <div>Ejemplos: {word.example}</div>
                        }

                    </td>
                    <td>
                    </td>
                </tr>
            )}
        </>
    );
}


export default WordCard;
