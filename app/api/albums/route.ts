import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const artistFilter = req.nextUrl.searchParams.get("artist")?.toLowerCase();
  const genreFilter = req.nextUrl.searchParams.get("genre")?.toLowerCase() || '';
  const yearFilter = req.nextUrl.searchParams.get("year") || '';
  const formatFilter = req.nextUrl.searchParams.get("format")?.toLowerCase() || '';
  const styleFilter = req.nextUrl.searchParams.get("style")?.toLowerCase() || '';
  const diskFilters: any = [];
  // Build the query based on filters

  if (artistFilter) diskFilters.push({ artistName: { contains: artistFilter } });
  if (genreFilter) diskFilters.push({ genre: { contains: genreFilter } });
  if (yearFilter) diskFilters.push({ year: parseInt(yearFilter) });
  if (formatFilter) diskFilters.push({ format: { contains: formatFilter } });
  if (styleFilter) diskFilters.push({ style: { contains: styleFilter } });

  // Disks query with filters


    const disks = await prisma.disk.findMany({
      where: {
        AND: diskFilters, // Only includes conditions that are set
      },
      include: {
        artist: true,
        Song: true,
      },
    });
  return NextResponse.json(disks);
}
