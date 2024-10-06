"use client"; // Ensure this component runs on the client side

import React, { useState } from 'react';
import AlbumCard from './AlbumCard';

interface Album {
  artist: string;
  artistUrl: string;
  albumName: string;
  albumCover: string;
  albumUrl: string;
  year: number;
  genre: string;
  format: string;
  style: string;
  case: string;
}

export default function AlbumCollectionWithFilterSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Sidebar default to open
  const [filters, setFilters] = useState({
    genres: [] as string[],
    styles: [] as string[],
    formats: [] as string[],
    cases: [] as string[],
  });
  const [albums] = useState<Album[]>([
    {
      artist: 'Taylor Swift',
      artistUrl: '/artist/taylor-swift',
      albumName: '1989',
      albumCover: 'https://link-to-album-cover.com/1989.jpg',
      albumUrl: '/album/1989',
      year: 2014,
      genre: 'Pop',
      format: 'CD',
      style: 'Synth-pop',
      case: 'Standard',
    },
    {
      artist: 'Kanye West',
      artistUrl: '/artist/kanye-west',
      albumName: 'The Life of Pablo',
      albumCover: 'https://link-to-album-cover.com/tlop.jpg',
      albumUrl: '/album/tlop',
      year: 2016,
      genre: 'Hip Hop',
      format: 'Vinyl',
      style: 'Rap',
      case: 'Deluxe',
    },
    {
      artist: 'Adele',
      artistUrl: '/artist/adele',
      albumName: '25',
      albumCover: 'https://link-to-album-cover.com/25.jpg',
      albumUrl: '/album/25',
      year: 2015,
      genre: 'Soul',
      format: 'Digital',
      style: 'Ballad',
      case: 'Standard',
    },
  ]);

  // Handle filter toggling for checkboxes
  const handleFilterChange = (category: string, value: string) => {
    setFilters((prevFilters) => {
      const categoryFilters = prevFilters[category as keyof typeof prevFilters];
      const isSelected = categoryFilters.includes(value);

      return {
        ...prevFilters,
        [category]: isSelected
          ? categoryFilters.filter((item) => item !== value) // Remove if selected
          : [...categoryFilters, value], // Add if not selected
      };
    });
  };

  // Filter albums based on selected filters
  const filteredAlbums = albums.filter((album) => {
    const genreMatch =
      filters.genres.length === 0 || filters.genres.includes(album.genre);
    const styleMatch =
      filters.styles.length === 0 || filters.styles.includes(album.style);
    const formatMatch =
      filters.formats.length === 0 || filters.formats.includes(album.format);
    const caseMatch =
      filters.cases.length === 0 || filters.cases.includes(album.case);

    return genreMatch && styleMatch && formatMatch && caseMatch;
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`relative bg-gray-800 h-screen  text-white ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden z-10`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Filter Albums</h2>

          {/* Genre Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Genres</h3>
            {['Pop', 'Hip Hop', 'Soul'].map((genre) => (
              <div key={genre}>
                <input
                  type="checkbox"
                  id={`genre-${genre}`}
                  checked={filters.genres.includes(genre)}
                  onChange={() => handleFilterChange('genres', genre)}
                />
                <label htmlFor={`genre-${genre}`} className="ml-2">
                  {genre}
                </label>
              </div>
            ))}
          </div>

          {/* Style Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Styles</h3>
            {['Synth-pop', 'Rap', 'Ballad'].map((style) => (
              <div key={style}>
                <input
                  type="checkbox"
                  id={`style-${style}`}
                  checked={filters.styles.includes(style)}
                  onChange={() => handleFilterChange('styles', style)}
                />
                <label htmlFor={`style-${style}`} className="ml-2">
                  {style}
                </label>
              </div>
            ))}
          </div>

          {/* Format Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Formats</h3>
            {['CD', 'Vinyl', 'Digital'].map((format) => (
              <div key={format}>
                <input
                  type="checkbox"
                  id={`format-${format}`}
                  checked={filters.formats.includes(format)}
                  onChange={() => handleFilterChange('formats', format)}
                />
                <label htmlFor={`format-${format}`} className="ml-2">
                  {format}
                </label>
              </div>
            ))}
          </div>

          {/* Case Filter */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Cases</h3>
            {['Standard', 'Deluxe'].map((caseType) => (
              <div key={caseType}>
                <input
                  type="checkbox"
                  id={`case-${caseType}`}
                  checked={filters.cases.includes(caseType)}
                  onChange={() => handleFilterChange('cases', caseType)}
                />
                <label htmlFor={`case-${caseType}`} className="ml-2">
                  {caseType}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full focus:outline-none z-20"
        style={{
          left: isSidebarOpen ? '16rem' : '0.5rem', // Move button with sidebar
          transition: 'left 0.3s ease',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-300 ${
            isSidebarOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredAlbums.map((album, index) => (
            <AlbumCard
              key={index}
              artist={album.artist}
              artistUrl={album.artistUrl}
              albumName={album.albumName}
              albumCover={album.albumCover}
              albumUrl={album.albumUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
