-- CreateTable
CREATE TABLE `Song` (
    `track` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL,
    `length` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `artistName` VARCHAR(191) NOT NULL,
    `diskName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disk` (
    `name` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL,
    `artistName` VARCHAR(191) NOT NULL,
    `barcode` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `format` VARCHAR(191) NOT NULL,
    `style` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Disk_name_key`(`name`),
    UNIQUE INDEX `Disk_barcode_key`(`barcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artist` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Artist_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Label` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_diskName_fkey` FOREIGN KEY (`diskName`) REFERENCES `Disk`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_artistName_fkey` FOREIGN KEY (`artistName`) REFERENCES `Artist`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disk` ADD CONSTRAINT `Disk_artistName_fkey` FOREIGN KEY (`artistName`) REFERENCES `Artist`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
