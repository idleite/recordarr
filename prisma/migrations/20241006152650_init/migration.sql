-- DropForeignKey
ALTER TABLE `Song` DROP FOREIGN KEY `Song_diskName_fkey`;

-- DropIndex
DROP INDEX `Disk_name_key` ON `Disk`;

-- AlterTable
ALTER TABLE `Song` ADD COLUMN `diskId` INTEGER NULL,
    MODIFY `diskName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_diskId_fkey` FOREIGN KEY (`diskId`) REFERENCES `Disk`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
