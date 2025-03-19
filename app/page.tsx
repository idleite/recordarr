"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation'
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

interface params {
  searchTerm: string;
  type: string;
  artist: string;
  genre: string;
  year: any
  format: string;
  style: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const searchTerm: string = searchParams.get("query")|| '';
  var paramDict: params = {
    searchTerm: searchTerm || '',
    type: searchParams.get("type")|| '',
    artist: searchParams.get("artist")|| '',
    genre: searchParams.get("genre")|| '',
    year: searchParams.get("year")|| '',
    format: searchParams.get("format")|| '',
    style: searchParams.get("style")|| ''
  };


  const fetchResults = async () => {
    const params = new URLSearchParams();

    params.append('searchTerm', searchTerm || ''); 
    params.append('type', searchParams.get("type")|| '');
    params.append('artist', searchParams.get("artist")|| '');
    params.append('genre', searchParams.get("genre")|| '');
    params.append('year', searchParams.get("year")|| '');
    params.append('format', searchParams.get("format")|| '');
    params.append('style', searchParams.get("style")|| '');

    // const response = await fetch(`/api/search?${params.toString()}`);
    useEffect(() => async () => {
      const response = await fetch(`/api/search?${params.toString()}`);

      const data = await response.json();
      
      setAlbums(data.disks);
      setArtists(data.artists);
      setSongs(data.songs);
    }, [params.toString()]);



  };

  // useEffect(() => {
    fetchResults();
  // });


  // Filter results based on the selected content type
  const filteredArtists = paramDict.type == "all" || paramDict.type == "artists" ? artists : [];
  const filteredAlbums = paramDict.type == "all" || paramDict.type == 'albums' ? albums : [];
  const filteredSongs = paramDict.type == "all" || paramDict.type == 'songs' ? songs : [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <FilterSidebar search={paramDict}  />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">

        <form >
          <input
            type="text"
            name="query"
            defaultValue={searchParams.get("query")}
            placeholder="Search for an album, artist, or song..."
            className="w-full p-2 border rounded-md"
          />
        </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {
              (paramDict.type == "all" || paramDict.type == "artists") && filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  imageUrl={artist.img || '/default.jpg'}
                />
              ))
            }
            
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
