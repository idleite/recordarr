import Link from 'next/link';
import Image from "next/image";

interface SongCardProps {
  id: number;
  artistName: string;
  songName: string;
  albumName: string;
  imageUrl: string;
  linkToAlbum: string; // Link to the album
}

const SongCard: React.FC<SongCardProps> = ({ id, artistName, songName, albumName, imageUrl, linkToAlbum }) => {
  return (
    <Link href={linkToAlbum} className="block border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
              <Image
          src={imageUrl}
          alt={albumName}
          width={250}
          height={250}
          className="rounded-md"
        />
      {/* <img src={imageUrl} alt={albumName} className="w-full h-32 object-cover rounded-md mb-2" /> */}
      <h3 className="text-lg font-semibold">{songName}</h3>
      <p className="text-sm text-gray-600">{artistName}</p>
      <p className="text-sm text-gray-600">{albumName}</p>
    </Link>
  );
};

export default SongCard;
