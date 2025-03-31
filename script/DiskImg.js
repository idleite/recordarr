// Import necessary libraries
import { PrismaClient } from '@prisma/client';
import { DiscogsClient } from '@lionralfs/discogs-client';
const client = new DiscogsClient({ auth: { userToken: 'MqOJxeayrbHuVEvjJBXUpehWgMLDGoPbnsbuQumK' } });
client.setConfig({
    exponentialBackoffIntervalMs: 2000,
    exponentialBackoffMaxRetries: 5,
    exponentialBackoffRate: 2.7,
});
// Initialize Prisma Client
const prisma = new PrismaClient();



async function updateDiskIds() {
    let discogs  = await client.database();
  try {
    // Get all disks from the disk table
    const disks = await prisma.disk.findMany();

    // Loop through each disk to get the thumbnail from Discogs
    for (const disk of disks) {
      // Fetch the release from Discogs using the disk ID
      const releaseId = disk.id; // Assuming disk.id corresponds to the Discogs release ID
      const release = await discogs.getRelease(releaseId);
        console.log(release["data"].images)
        console.log(release["data"].images.length)
      // If a corresponding release is found, update the disk with the thumbnail
      if (release && release["data"].images && (release["data"].images.length > 0)) {
        const thumbnailUrl = release["data"].images[0].uri // Get the first image's URI
        console.log(thumbnailUrl)
        // Update the disk in the database with the thumbnail link
        await prisma.disk.update({
          where: {
            id: disk.id,
          },
          data: {
            img: thumbnailUrl, // Assuming img is the field in the disk table
          },
        });

        console.log(`Updated img for disk ${disk.id} with URL: ${thumbnailUrl}`);
      } else {
        console.log(`No images found for Disk ID: ${disk.id}`);
      }
    }

    console.log('Image update process completed.');
  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
updateDiskIds();
