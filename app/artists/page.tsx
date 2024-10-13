"use client";

import React, { useState, useEffect } from 'react';
import ArtistCard from '@/components/ArtistCard';

interface Artist {
  id: number;
  name: string;
  img: string;

}

export default function ArtistListPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const fetchArtists = async () => {
    // Fetch artists via the API route
    const response = await fetch('/api/artist', {
      method: 'GET', // Assuming you want to fetch all artists without filters
    });

    const data = await response.json();
    setArtists(data);
  };

  useEffect(() => {
    fetchArtists(); // Fetch artists when component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex">
      {/* Artist List */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Artists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist: Artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              imageUrl={artist.img || '/default.jpg'} // Provide a default image if none exists
            />
          ))}
        </div>
      </div>
    </div>
  );
}
