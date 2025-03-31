// import { NextResponse, NextRequest } from 'next/server'
// export async function POST(request: NextRequest) {
//   // recordinfo = request.body
//   return NextResponse.json({ body: request.text }, { status: 200 })
// }

import { type NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'
import prisma from '@/libs/prisma'
import { validateSessionToken } from '@/lib/server/session'
export async function GET(request: NextRequest) {
    const sessionToken = await request.cookies.get("session")?.value

    const session = await validateSessionToken(sessionToken)
    console.log(session.user?.role)
    console.log(sessionToken)
    return Response.json({})

}