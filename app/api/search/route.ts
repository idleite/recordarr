import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("searchTerm")?.toLowerCase() || '';
  const artistFilter = req.nextUrl.searchParams.get("artist")?.toLowerCase() || '';
  const genreFilter = req.nextUrl.searchParams.get("genre")?.toLowerCase() || '';
  const yearFilter = req.nextUrl.searchParams.get("year") || '';
  const formatFilter = req.nextUrl.searchParams.get("format")?.toLowerCase() || '';
  const styleFilter = req.nextUrl.searchParams.get("style")?.toLowerCase() || '';

  try {
    // Artists query
    const artists = await prisma.artist.findMany({
      where: {
        name: { contains: artistFilter },
        ...(searchTerm && { name: { contains: searchTerm } }),
      },
      include: {
        Disk: true,
        Song: true,
      },
    });

    // Disks query with filters
    const disks = await prisma.disk.findMany({
      where: {
        AND: [
          { name: { contains: searchTerm } },
          { artistName: { contains: artistFilter } },
          genreFilter ? { genre: { contains: genreFilter } } : undefined,
          yearFilter ? { year: parseInt(yearFilter) } : undefined,
          formatFilter ? { format: { contains: formatFilter } } : undefined,
          styleFilter ? { style: { contains: styleFilter } } : undefined,
        ].filter(Boolean),
      },
      include: {
        artist: true,
        Song: true,
      },
    });

    // Songs query with filters
    const songs = await prisma.song.findMany({
      where: {
        AND: [
          { name: { contains: searchTerm } },
          { artistName: { contains: artistFilter } },
          {
            disk: {
              genre: genreFilter ? { contains: genreFilter } : undefined,
              year: yearFilter ? parseInt(yearFilter) : undefined,
              format: formatFilter ? { contains: formatFilter } : undefined,
              style: styleFilter ? { contains: styleFilter } : undefined,
            },
          },
        ].filter(Boolean),
      },
      include: {
        artist: true,
        disk: true,
      },
    });

    return NextResponse.json({ artists, disks, songs });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
