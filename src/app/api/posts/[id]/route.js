const { NextResponse } = require("next/server");
import db from "@/libs/db";

export async function GET(request, { params }) {
    console.log(params.id);
    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
    })
    console.log(post);
    return NextResponse.json(post)
}

export async function PUT(request, { params }) {

    const data = await request.json()
    
    const postUpdate = await prisma.post.update({
        where: {
            id: Number(params.id)
        },
            data: data
        })
    
    return NextResponse.json(postUpdate)
}

export async function DELETE(request, { params }) {
    try {

        const postRemoved = await prisma.post.delete({
            where: { id: Number(params.id) }
        })
        console.log(postRemoved);
        return NextResponse.json(postRemoved)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}