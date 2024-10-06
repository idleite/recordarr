import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const filters = await req.json(); // Get the filters from the POST request body

  // Build the query based on filters
  const query: any = {
    include: { artist: true },
  };

  if (filters.artist) query.where = { ...query.where, artistName: filters.artist };
  if (filters.genre) query.where = { ...query.where, genre: filters.genre };
  if (filters.year) query.where = { ...query.where, year: parseInt(filters.year) };
  if (filters.format) query.where = { ...query.where, format: filters.format };
  if (filters.style) query.where = { ...query.where, style: filters.style };

  const albums = await prisma.disk.findMany(query);

  return NextResponse.json(albums);
}
