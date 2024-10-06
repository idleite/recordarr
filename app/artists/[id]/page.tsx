"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AlbumCard from '@/components/AlbumCard';
interface Disk {
  id: number;
  artist: Artist;
  artistUrl: string;
  name: string;
  img: string;
  albumUrl: string;
  year: number;
  genre: string;
  format: string;
  style: string;
  case: string;
}

interface Artist {
  id: number;
  name: string;
  img: string;
  Disk: Disk[];
}

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`/api/artist/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error || 'Artist not found');
          return;
        }
        const data = await res.json();
        setArtist(data);
      } catch (error) {
        setError('Something went wrong while fetching artist data.');
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  if (!artist) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center space-x-4 mb-8">
        {artist.img && (
          <Image src={artist.img} alt={artist.name} width={150} height={150} className="rounded-full" />
        )}
        <h1 className="text-3xl font-bold">{artist.name}</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Albums</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artist.Disk.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              artistID={artist.id}
              artistName={artist.name}
              albumName={album.name}
              imageUrl={album.img || '/download.jpg'}
              year={album.year}
              genre={album.genre || 'Unknown'}
            />
          ))}
      </div>
    </div>
  );
}
