const { NextResponse } = require("next/server");
import db from "@/libs/db";

export async function GET(request, { params }) {
    console.log(params.id);
    const word = await prisma.word.findUnique({
        where: { id: Number(params.id) },
    })
    console.log(word);
    return NextResponse.json(word)
}

export async function PUT(request, { params }) {

    const data = await request.json()
    
    const wordUpdate = await prisma.word.update({
        where: {
            id: Number(params.id)
        },
            data: data
        })
    
    return NextResponse.json(wordUpdate)
}

export async function DELETE(request, { params }) {
    try {

        const wordRemoved = await prisma.word.delete({
            where: { id: Number(params.id) }
        })
        console.log(wordRemoved);
        return NextResponse.json(wordRemoved)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}