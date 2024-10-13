import { DiscogsClient } from '@lionralfs/discogs-client';
const client = new DiscogsClient({ auth: { userToken: process.env.DISCOGS_USER_TOKEN } });
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient()

export default async function DiskSave(DiskBarcode, DiskLocation, isChecked) {
    DiskBarcode = DiskBarcode.toString()
    let db = await client.database();
    let data = await db.search({ barcode: DiskBarcode });
    if (data.data.results.length === 0) {
        return false;
    }

    data = (await db.getRelease(data.data.results[0]["id"])).data;
    let DiskYear = data["year"];
    let DiskID = data["id"];
    let DiskFormat = data["formats"][0]["name"];
    let DiskGenre = data["genres"][0];
    let DiskStyle = data["styles"][0];
    let DiskName = data["title"];
    let ArtistName = data["artists"][0]["name"];
    let ArtistID = data["artists"][0]["id"];
    let ArtistImg = data["artists"][0]["thumbnail_url"];

    // Check if artist exists
    let artist = await prisma.artist.findUnique({
        where: { id: ArtistID }
    });

    // If artist doesn't exist, create it
    if (!artist) {
        artist = await prisma.artist.create({
            data: {
                id: ArtistID,
                name: ArtistName,
                img: ArtistImg
            }
        });
    }

    // Now create the Disk
    const Disk = await prisma.disk.create({
        data: {
            case: isChecked,
            name: DiskName,
            id: DiskID,
            barcode: DiskBarcode,
            year: DiskYear,
            genre: DiskGenre,
            format: DiskFormat,
            style: DiskStyle,
            location: DiskLocation,
            artist: {
                connect: { id: ArtistID } // Only connect, since artist already exists or was created
            }
        }
    });

    // Create songs associated with the Disk
    for (const [key, value] of Object.entries(data["tracklist"])) {
        let SongDuration = value["duration"];
        let SongName = value["title"];
        let SongTrack = value["position"];

        await prisma.song.create({
            data: {
                length: SongDuration,
                name: SongName,
                track: SongTrack,
                artist: {
                    connect: { id: ArtistID }
                },
                disk: {
                    connect: { id: DiskID }
                }
            }
        });
    }

    return true;
}

// Get A Disk Release from Discogs and add to DB Based on Discogs Release Number
export async function DiskSaveRelease(ReleaseNumber, DiskLocation, isChecked) {
    let db = await client.database();
    let data = (await db.getRelease(ReleaseNumber)).data;

    let DiskYear = data["year"];
    let DiskID = data["id"];
    let DiskFormat = data["formats"][0]["name"];
    let DiskGenre = data["genres"][0];
    let DiskStyle = data["styles"][0];
    let DiskName = data["title"];
    let ArtistName = data["artists"][0]["name"];
    let ArtistID = data["artists"][0]["id"];
    let ArtistImg = data["artists"][0]["thumbnail_url"];
    let DiskBarcode = null;
    let DiskImg = data["images"][0]["uri150"];

    // Check if artist exists
    let artist = await prisma.artist.findUnique({
        where: { id: ArtistID }
    });

    // If artist doesn't exist, create it
    if (!artist) {
        artist = await prisma.artist.create({
            data: {
                id: ArtistID,
                name: ArtistName,
                img: ArtistImg
            }
        });
    }

    // Now create the Disk
    const Disk = await prisma.disk.create({
        data: {
            case: isChecked,
            name: DiskName,
            id: DiskID,
            barcode: DiskBarcode,
            year: DiskYear,
            genre: DiskGenre,
            format: DiskFormat,
            style: DiskStyle,
            location: DiskLocation,
            img: DiskImg,
            artist: {
                connect: { id: ArtistID } // Only connect, since artist already exists or was created
            }
        }
    });

    // Create songs associated with the Disk
    for (const [key, value] of Object.entries(data["tracklist"])) {
        let SongDuration = value["duration"];
        let SongName = value["title"];
        let SongTrack = value["position"];

        await prisma.song.create({
            data: {
                length: SongDuration,
                name: SongName,
                track: SongTrack,
                artist: {
                    connect: { id: ArtistID }
                },
                disk: {
                    connect: { id: DiskID }
                }
            }
        });
    }

    return true;
}
