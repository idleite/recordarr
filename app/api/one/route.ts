import { PrismaClient} from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()


export async function GET(request: NextRequest) {
    const findUser = await prisma.disk.count()
    // return Response.json({ "g": findUser?.barcode})
    console.log(findUser)
    return Response.json({ message: "h" }, { status: 200 });

}