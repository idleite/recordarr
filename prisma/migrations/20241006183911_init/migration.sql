/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Disk` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Song_diskName_fkey` ON `Song`;

-- CreateIndex
CREATE UNIQUE INDEX `Disk_name_key` ON `Disk`(`name`);
