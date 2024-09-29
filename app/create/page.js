import { DiscogsClient } from '@lionralfs/discogs-client';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export default function(DiskBarcode, DiskLocation) {
    let client = new DiscogsClient({ auth: { userToken: 'MqOJxeayrbHuVEvjJBXUpehWgMLDGoPbnsbuQumK' } });
    let db = client.database();
    db.search({ barcode: DiskBarcode})
    .then(function ({ data }) {
        db.getRelease(data.results[0]["id"])
            .then(function ({ data}) {
                let DiskYear = data["year"];
                let DiskID = data["id"];
                let DiskFormat = data["formats"][0]["name"]
                let DiskGenre = data["genres"][0]
                let DiskStyle = data["styles"][0]
                let DiskName = data["title"]
                let ArtistName = data["artists"][0]["name"]
                let ArtistID = data["artists"][0]["id"]
                let ArtistImg = data["artists"][0]["thumbnail_url"]
                const Disk =  prisma.Disk.create({
                    data: {
                      name: DiskName,
                      id: DiskID,
                      barcode: DiskBarcode,
                      year: DiskYear,
                      genre: DiskGenre,
                      format: DiskFormat,
                      style: DiskStyle,
                      location: DiskLocation,
                      artist: {
                        connectOrCreate: {
                            where: {
                              id: ArtistID,
                            },
                            create: {
                                id: ArtistID,
                                name: ArtistName,
                                img: ArtistImg,
                            },
                          }
                      }
                
                    },
                  })
                for (const [key, value] of Object.entries(data["tracklist"])) {
                    let SongDuration = value["duration"]
                    let SongName = value["title"]
                    let SongTrack = value["position"]
                    const song =  prisma.song.create({
                        data: {
                          length: SongDuration,
                          name: SongName,
                          track: SongTrack,
                          artist: {
                            connect: {
                                id: ArtistID,
                            }
                          },
                          disk: {
                            connect: {
                                id: DiskID,
                            }
                          }
                        },
                      })
                  }

            })
    });
}
