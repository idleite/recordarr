import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { list } from 'postcss';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchTerm = req.nextUrl.searchParams.get("searchTerm")?.toLowerCase() || '';
  const artistFilter = req.nextUrl.searchParams.get("artist")?.toLowerCase() || '';
  const typeFilter = req.nextUrl.searchParams.get("type")?.toLowerCase() || '';
  const genreFilter = req.nextUrl.searchParams.get("genre")?.toLowerCase() || '';
  const yearFilter = req.nextUrl.searchParams.get("year") || '';
  const formatFilter = req.nextUrl.searchParams.get("format")?.toLowerCase() || '';
  const styleFilter = req.nextUrl.searchParams.get("style")?.toLowerCase() || '';
  var data: {
    artists?: object;
    disks?: object;
    songs?: object;
  } = {}
  try {
    // Artists query
    if (typeFilter == "all" || typeFilter == "artists") {
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
    data["artists"] = artists || [];
    } 
    // Build dynamic filters for disks
    const diskFilters: any = [];
    
    if (searchTerm) diskFilters.push({ name: { contains: searchTerm } });
    if (artistFilter) diskFilters.push({ artistName: { contains: artistFilter } });
    if (genreFilter) diskFilters.push({ genre: { contains: genreFilter } });
    if (yearFilter) diskFilters.push({ year: parseInt(yearFilter) });
    if (formatFilter) diskFilters.push({ format: { contains: formatFilter } });
    if (styleFilter) diskFilters.push({ style: { contains: styleFilter } });

    // Disks query with filters

    if (typeFilter == "all" || typeFilter == "albums") {
      const disks = await prisma.disk.findMany({
        where: {
          AND: diskFilters, // Only includes conditions that are set
        },
        include: {
          artist: true,
          Song: true,
        },
      });
      data["disks"] = disks || [];
      } 
    // Build dynamic filters for songs
    const songFilters: any = [];

    if (searchTerm) songFilters.push({ name: { contains: searchTerm } });
    if (artistFilter) songFilters.push({ artistName: { contains: artistFilter } });

    const diskSubFilters: any = [];
    if (genreFilter) diskSubFilters.push({ genre: { contains: genreFilter } });
    if (yearFilter) diskSubFilters.push({ year: parseInt(yearFilter) });
    if (formatFilter) diskSubFilters.push({ format: { contains: formatFilter } });
    if (styleFilter) diskSubFilters.push({ style: { contains: styleFilter } });

    // Songs query with filters
    if (typeFilter == "all" || typeFilter == "songs") {
      const songs = await prisma.song.findMany({
        where: {
          AND: [
            ...songFilters,
            {
              disk: {
                AND: diskSubFilters, // Sub-filters applied to the associated disk
              },
            },
          ],
        },
        include: {
          artist: true,
          disk: true,
        },
      });
      data["songs"] = songs || [];
      } 
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
