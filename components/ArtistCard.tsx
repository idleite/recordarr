import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ArtistCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

export default function ArtistCard({ id, name, imageUrl}: ArtistCardProps) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <Link href={`/artists/${id}`} className="block hover:shadow-lg transition-shadow duration-300">
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={250}
          className="rounded-md"
        />
        <h2 className="text-xl font-bold mt-4">{name}</h2>
      </Link>
    </div>
  );
}
