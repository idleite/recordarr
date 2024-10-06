/*
  Warnings:

  - Made the column `diskId` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Song` DROP FOREIGN KEY `Song_diskId_fkey`;

-- AlterTable
ALTER TABLE `Song` MODIFY `diskId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_diskId_fkey` FOREIGN KEY (`diskId`) REFERENCES `Disk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
