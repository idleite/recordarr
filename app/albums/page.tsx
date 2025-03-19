"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
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
interface params {
  artist: string;
  genre: string;
  year: any
  format: string;
  style: string;
}
export default function AlbumListPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const searchParams = useSearchParams()
  var paramDict: params = {
    artist: searchParams.get("artist")|| '',
    genre: searchParams.get("genre")|| '',
    year: searchParams.get("year")|| '',
    format: searchParams.get("format")|| '',
    style: searchParams.get("style")|| ''
  };

  const fetchAlbums = async () => {

      const params = new URLSearchParams();
      params.append('artist', searchParams.get("artist")|| '');
      params.append('genre', searchParams.get("genre")|| '');
      params.append('year', searchParams.get("year")|| '');
      params.append('format', searchParams.get("format")|| '');
      params.append('style', searchParams.get("style")|| '');
      // Fetch filtered albums via the API route
    useEffect(() => async () => {
      const response = await fetch(`/api/albums?${params.toString()}`);
  
      const data = await response.json();
      setAlbums(data);
    }, [params.toString()]);
  };


    fetchAlbums(); // Fetch albums when component mounts or filters change


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex">
      {/* Sidebar */}
      <FilterSidebar search={paramDict}/>

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
