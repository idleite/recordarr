import { DiscogsClient } from '@lionralfs/discogs-client';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export async  function FormDiskSave(formData) {
  "use server";
	const barcode = formData.get("barcode");
  const location = formData.get("location");
  DiskSave(barcode, location)

}
export default async function DiskSave(DiskBarcode, DiskLocation, isChecked) {
    DiskBarcode = DiskBarcode.toString()
    let client = new DiscogsClient({ auth: { userToken: 'MqOJxeayrbHuVEvjJBXUpehWgMLDGoPbnsbuQumK' } });
    let db  = await client.database();
    let data = await db.search({ barcode: DiskBarcode})
    if (data.data.results.length==0){
      return false
    }
    console.log(data.data.results.length)
    data = (await db.getRelease(data.data.results[0]["id"])).data
    // console.log(data)
                let DiskYear = data["year"];
                let DiskID = data["id"];
                let DiskFormat = data["formats"][0]["name"]
                let DiskGenre = data["genres"][0]
                let DiskStyle = data["styles"][0]
                let DiskName = data["title"]
                let ArtistName = data["artists"][0]["name"]
                let ArtistID = data["artists"][0]["id"]
                let ArtistImg = data["artists"][0]["thumbnail_url"]
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
                    console.log(SongName)
                    const song = await prisma.song.create({
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
                      console.log(song.track)
                  }
return true
            }
// DiskSave(074644504811, "1-02")