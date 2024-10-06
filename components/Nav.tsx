"use client";
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Recordarr
        </div>
        <div className="space-x-4">
          <a href="/" className="text-gray-300 hover:text-white">Home</a>
          <a href="/albums" className="text-gray-300 hover:text-white">Albums</a>
          <a href="/artists" className="text-gray-300 hover:text-white">Artists</a>
        </div>
      </div>
    </nav>
  );
}
