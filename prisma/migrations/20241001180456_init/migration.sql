-- AlterTable
ALTER TABLE `Disk` MODIFY `genre` VARCHAR(191) NULL,
    MODIFY `format` VARCHAR(191) NULL,
    MODIFY `style` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Song` MODIFY `length` VARCHAR(191) NULL;
