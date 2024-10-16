"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Recordarr
        </div>
        <div className="space-x-4 flex items-center">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/albums" className="text-gray-300 hover:text-white">Albums</a>
          <a href="/artists" className="text-gray-300 hover:text-white">Artists</a>

          {/* Continuous Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div className="inline-flex items-center">

              {/* Main "Add" Button */}
              <a
                href="/albums/Create"
                className="bg-blue-600 text-white px-6 py-2 rounded-l-full focus:outline-none hover:bg-blue-700"
              >
                Add
              </a>

              {/* Grey Divider Line */}
              <div className="w-[1px] h-10 bg-gray-400"></div>

              {/* Dropdown Button */}
              <button
                onClick={toggleDropdown}
                className="bg-blue-600 text-white px-2 py-2.5 rounded-r-full focus:outline-none hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                  <path d="M3.204 5h9.592L8 10.481 3.204 5z" />
                </svg>
              </button>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded shadow-lg z-10">
                <a href="/albums/Create/Release" className="block px-4 py-3 text-gray-700 hover:bg-gray-200">Add Release</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
