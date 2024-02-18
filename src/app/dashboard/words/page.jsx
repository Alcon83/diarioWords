'use client';
import React, { useEffect, useState } from 'react';
import WordCard from '@/components/WordCard';
import { useRouter } from 'next/navigation'; // Ajusta el importe correcto aquí
import { signOut } from 'next-auth/react'
import { FaPlus } from 'react-icons/fa'

function DashboardPage() {
  const [words, setWords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Asegúrate de implementar la lógica de carga aquí correctamente
    const fetchWords = async () => {
      const res = await fetch('/api/words');
      const data = await res.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  const onDelete = async (id) => {
    const response = await fetch(`/api/words/${id}`, { method: 'DELETE' });
    if (response.ok) {

      setTimeout(() => {
        router.refresh();
        router.push('/dashboard/words');
      }, 3000); // Espera 100ms antes de redirigir


    } else {
      console.error('Error al eliminar la palabra');
    }
  };

  const navigateToCreatePost = () => router.push('/dashboard/words/create');

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-center m-8">
        <button
          onClick={navigateToCreatePost}
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 transition-colors ease-in-out duration-150 text-white font-bold rounded shadow"
        >
          <FaPlus className="mr-2" /> Añadir palabra
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className=" leading-normal ">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider ">
                Palabra
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider w-full">
                Definición
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Usos
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-right text-xs font-semibold uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <WordCard key={word.id} word={word} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DashboardPage;
