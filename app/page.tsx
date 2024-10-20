"use client";

import React, { useState, useEffect } from 'react';
import AlbumCard from '@/components/AlbumCard';
import ArtistCard from '@/components/ArtistCard';
import SongCard from '@/components/SongCard';
import FilterSidebar from '@/components/SearchFilter';

interface Artist {
  id: number;
  name: string;
  img: string;
}

interface Album {
  id: number;
  name: string;
  img: string;
  artist: Artist;
  year: number;
  genre: string;
}

interface Song {
  id: number;
  name: string;
  artist: Artist;
  disk: Album;
}

export default function SearchPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    artist: '',
    genre: '',
    year: '',
    format: '',
    style: '',
    contentType: 'all', // Default to show all content types
  });

  const fetchResults = async () => {
    const params = new URLSearchParams();

    if (searchTerm) params.append('searchTerm', searchTerm);
    if (filters.artist) params.append('artist', filters.artist);
    if (filters.genre) params.append('genre', filters.genre);
    if (filters.year) params.append('year', filters.year);
    if (filters.format) params.append('format', filters.format);
    if (filters.style) params.append('style', filters.style);

    const response = await fetch(`/api/search?${params.toString()}`);
    const data = await response.json();

    setAlbums(data.disks);
    setArtists(data.artists);
    setSongs(data.songs);
  };

  useEffect(() => {
    fetchResults();
  });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter results based on the selected content type
  const filteredArtists = filters.contentType === 'all' || filters.contentType === 'artists' ? artists : [];
  const filteredAlbums = filters.contentType === 'all' || filters.contentType === 'albums' ? albums : [];
  const filteredSongs = filters.contentType === 'all' || filters.contentType === 'songs' ? songs : [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search for an album, artist, or song..."
            className="w-full p-2 border rounded-md"
          />
        </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                id={artist.id}
                name={artist.name}
                imageUrl={artist.img || '/default.jpg'}
              />
            ))}
            {filteredAlbums.map((album) => (
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

            {filteredSongs.map((song) => (
              <SongCard
                key={song.id}
                id={song.id}
                artistName={song.artist.name}
                songName={song.name}
                albumName={song.disk.name}
                imageUrl={song.disk.img || '/placeholder_album.jpg'}
                linkToAlbum={`/albums/${song.disk.id}`} // Link to the album page
              />
            ))}
          </div>
      </div>
    </div>
  );
}
