import { NextResponse, NextRequest } from 'next/server'
export async function POST(request: NextRequest) {
  return NextResponse.json({ body: request.bodyUsed }, { status: 200 })
}
