// Import the Prisma Client
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateDiskIds() {
  try {
    // Get all songs from the song table
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        diskName: true, // assuming DiskName is a field in the song table
      },
    });

    // Loop through each song and update the DiskId based on DiskName
    for (const song of songs) {
      const disk = await prisma.disk.findUnique({
        where: {
          name: song.diskName, // assuming `name` is the field used to match DiskName
        },
      });

      // If a corresponding disk is found, update the song with the DiskId
      if (disk) {
        await prisma.song.update({
          where: {
            id: song.id,
          },
          data: {
            diskId: disk.id, // Assuming DiskId is the field in the song table
          },
        });

        console.log(`Updated DiskId for song ${song.id} to ${disk.id}`);
      } else {
        console.log(`No disk found for DiskName: ${song.DiskName}`);
      }
    }

    console.log('DiskId update process completed.');
  } catch (error) {
    console.error('Error updating DiskIds:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
updateDiskIds();
