'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const router = useRouter();

    // Función para manejar la navegación
    const navigateTo = (path) => () => {
        router.push(path);
    };

    return (
        <div className="container mx-auto px-4 py-8 text-gray-200">
            <h1 className="text-4xl font-bold text-center mb-12">Bienvenido a tu Espacio Personal</h1>
            <p className="text-lg text-center mb-8">Aquí podrás mantener un diario personal subiendo imágenes y texto, así como un diccionario para las palabras o expresiones que vayas aprendiendo.</p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Sección del diario personal */}
                <div onClick={navigateTo('/dashboard/posts')} className="space-y-4 hover:scale-103 transition-transform duration-300 bg-gray-400 cursor-pointer rounded-lg p-4 text-black ">
                    <div className="overflow-hidden rounded-lg">
                        <img src="images/diariodeviage.webp" alt="Diario Personal" className="w-full h-auto transform hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Diario Personal</h2>
                    <p>Guarda tus experiencias diarias, reflexiones y momentos especiales con texto e imágenes.</p>
                </div>

                {/* Sección del diccionario de palabras */}
                <div onClick={navigateTo('/dashboard/words')} className="space-y-4 hover:scale-103 transition-transform duration-300 bg-gray-400 cursor-pointer rounded-lg p-4 text-black ">
                    <div className="overflow-hidden rounded-lg">
                        <img src="images/diccionario.webp" alt="Diccionario de Palabras" className="w-full h-auto transform hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Diccionario de Palabras</h2>
                    <p>Amplía tu vocabulario guardando palabras o expresiones nuevas junto con sus definiciones y ejemplos de uso.</p>
                </div>
            </div>
        </div>

    );
}

export default Dashboard;
