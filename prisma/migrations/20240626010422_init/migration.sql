/*
  Warnings:

  - You are about to drop the column `genre` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Song` DROP COLUMN `genre`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
