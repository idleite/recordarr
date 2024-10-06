"use client";

import React, { useState, useEffect } from 'react';
import AlbumCard from '@/components/AlbumCard';
import FilterSidebar from '@/components/FilterSidebar';
interface Artist {
  id: number;
  name: string;
}
interface Album {
  id: number,
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
export default function AlbumListPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filters, setFilters] = useState({
    artist: '',
    genre: '',
    year: '',
    format: '',
    style: '',
  });

  const fetchAlbums = async () => {
    // Fetch filtered albums via the API route
    const response = await fetch('/api/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters), // Send the filters to the server
    });

    const data = await response.json();
    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums(); // Fetch albums when component mounts or filters change
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Album List */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Albums</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map((album: Album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              artistID={album.artist.id}
              artistName={album.artist.name}
              albumName={album.name}
              imageUrl={album.img || '/download.jpg'}
              year={album.year}
              genre={album.genre || 'Unknown'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
