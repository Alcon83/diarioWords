import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    // Obtiene todos los posts desde la base de datos
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc',
          },
        
    });
    console.log(posts);
    // Retorna los posts obtenidos
    return NextResponse.json(posts);
}

export async function POST(request) {
    // Extrae la información del post del cuerpo de la solicitud
    const { title, content, seo, authorId, imageUrl } = await request.json();

    // Crea un nuevo post en la base de datos
    const newPost = await db.post.create({
        data: {
            title,
            content,
            seo,
            imageUrl, // Este campo es opcional
        }
    });

    return NextResponse.json(newPost);
}