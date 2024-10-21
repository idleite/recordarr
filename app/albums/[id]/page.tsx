import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const prisma = new PrismaClient();

interface AlbumPageProps {
  params: {
    id: string;
  };
}

interface Song {
  track: string;
  name: string;
  id: number;
  length: string | null;
  artistName: string;
  diskName: string | null;
  diskId: number;
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = await prisma.disk.findUnique({
    where: { id: Number(params.id) },
    include: {
      artist: true,
      Song: true,
      checkedOutBy: true,
    },
  });

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-4 shadow-md rounded-md">
        {/* Album Info Section */}
        <div className="flex items-center">
          <Image
            src={album.img || '/download.jpg'}
            alt={`${album.name} cover`}
            width={200}
            height={200}
            className="rounded-md"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-bold">{album.name}</h1>
            <p className="text-xl text-gray-600">by 
              <Link href={`/artists/${album.artist.id}`} className="ml-2 text-blue-500 underline">
                {album.artist.name}
              </Link>
            </p>
            <p className="text-gray-700 mt-2">Year: {album.year}</p>
            <p className="text-gray-700">Genre: {album.genre || 'Unknown'}</p>
            <p className="text-gray-700">Style: {album.style || 'Unknown'}</p>
            <p className="text-gray-700">Format: {album.format || 'Unknown'}</p>
            <p className="text-gray-700">Location: {album.location}</p>
            
            {/* Checked Out Status */}
            {album.checkedOutBy ? (
              <p className="text-red-500 mt-2">Checked out by: {album.checkedOutBy.name}</p>
            ) : (
              <p className="text-green-500 mt-2">Available</p>
            )}
          </div>
        </div>

        {/* Song List */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Songs</h2>
          <ul className="list-disc list-inside">
            {album.Song.map((song: Song) => (
              <li key={song.id} className="text-gray-800">
                {song.name} {song.length ? `(${song.length})` : ''}
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          {!album.checkedOutBy && (
            <button className="bg-blue-500 text-white rounded-md p-2">
              Check Out Album
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
