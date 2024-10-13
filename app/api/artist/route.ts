import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    // Fetch all artists from the database
    const artists = await prisma.artist.findMany({
      include: { Disk: true }, // Include related disks (albums) for each artist
    });

    return NextResponse.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json({ error: 'Failed to fetch artists' }, { status: 500 });
  }
}
