"use client";
import React, { useState, useEffect, useRef } from 'react';

interface FilterSidebarProps {
  filters: {
    artist: string;
    genre: string;
    year: string;
    format: string;
    style: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    artist: string;
    genre: string;
    year: string;
    format: string;
    style: string;
  }>>;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const [isVisible, setIsVisible] = useState(false); // Controls visibility of the sidebar
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  // Show sidebar on hover
  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const hoverArea = document.getElementById('hover-area');
    const sidebarElement = sidebarRef.current; // Store the current ref value in a variable

    if (hoverArea && sidebarElement) {
      hoverArea.addEventListener('mouseenter', handleMouseEnter);
      sidebarElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (hoverArea && sidebarElement) {
        hoverArea.removeEventListener('mouseenter', handleMouseEnter);
        sidebarElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <>
      {/* Hover Area (Trigger to show sidebar) */}
      <div
        id="hover-area"
        className="fixed left-0 top-0 h-screen w-5 z-20"
        style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-screen w-64 bg-white p-4 shadow-md z-10 transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h2 className="text-2xl font-semibold mb-4">Filters</h2>

        {/* Artist Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Artist</label>
          <input
            type="text"
            name="artist"
            value={filters.artist}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter artist name"
          />
        </div>

        {/* Genre Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter genre"
          />
        </div>

        {/* Year Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter release year"
          />
        </div>

        {/* Format Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Format</label>
          <input
            type="text"
            name="format"
            value={filters.format}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter format"
          />
        </div>

        {/* Style Filter */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Style</label>
          <input
            type="text"
            name="style"
            value={filters.style}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter style"
          />
        </div>
      </div>
    </>
  );
}
