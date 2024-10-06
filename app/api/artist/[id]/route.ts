import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const artistId = parseInt(params.id, 10);

  if (isNaN(artistId)) {
    return NextResponse.json({ error: 'Invalid artist ID' }, { status: 400 });
  }

  try {
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        Disk: true,
        Song: true,
      },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
