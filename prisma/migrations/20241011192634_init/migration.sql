-- CreateTable
CREATE TABLE "Song" (
    "track" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "length" TEXT,
    "artistName" TEXT NOT NULL,
    "diskName" TEXT,
    "diskId" INTEGER NOT NULL,
    CONSTRAINT "Song_diskId_fkey" FOREIGN KEY ("diskId") REFERENCES "Disk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Song_artistName_fkey" FOREIGN KEY ("artistName") REFERENCES "Artist" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Disk" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artistName" TEXT NOT NULL,
    "barcode" TEXT,
    "year" INTEGER NOT NULL,
    "genre" TEXT,
    "format" TEXT,
    "style" TEXT,
    "location" TEXT NOT NULL,
    "case" BOOLEAN DEFAULT true,
    "img" TEXT DEFAULT '/download.jpg',
    CONSTRAINT "Disk_artistName_fkey" FOREIGN KEY ("artistName") REFERENCES "Artist" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT
);

-- CreateTable
CREATE TABLE "Label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Disk_barcode_key" ON "Disk"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");
