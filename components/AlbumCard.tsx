import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  id: number;
  artistName: string;
  artistID: Number;
  albumName: string;
  imageUrl: string;
  year: number;
  genre: string;
}

export default function AlbumCard({ id, artistName, artistID, albumName, imageUrl, year, genre }: AlbumCardProps) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <Link href={`/albums/${id}`} className="block hover:shadow-lg transition-shadow duration-300">
        <Image
          src={imageUrl}
          alt={albumName}
          width={250}
          height={250}
          className="rounded-md"
        />
        <h2 className="text-xl font-bold mt-4">{albumName}</h2>
      </Link>
      <p className="text-gray-600">
        by <Link href={`/artists/${artistID}`} className="text-blue-500 underline">
          {artistName}
        </Link>
      </p>
      <p className="text-gray-700 mt-1">Year: {year}</p>
      <p className="text-gray-700 mt-1">Genre: {genre}</p>
    </div>
  );
}
