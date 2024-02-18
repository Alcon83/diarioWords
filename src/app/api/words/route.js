import db from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
    // Asegúrate de que el modelo `task` existe en tu esquema Prisma
    const words = await db.word.findMany();
    console.log(words);
    // Retorna las tareas obtenidas
    return NextResponse.json(words);
}


export async function POST(request) {

    const { word, definition, example, use } = await request.json()

    const newWord = await prisma.word.create({
        data: {
            word,
            definition,
            example,
            use
        }
    })
    return NextResponse.json(newWord)
}
