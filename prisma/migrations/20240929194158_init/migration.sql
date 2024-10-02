/*
  Warnings:

  - You are about to alter the column `barcode` on the `Disk` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Disk` MODIFY `barcode` INTEGER NOT NULL;
