-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Disk" (
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
    "checkedOutById" INTEGER,
    CONSTRAINT "Disk_artistName_fkey" FOREIGN KEY ("artistName") REFERENCES "Artist" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Disk_checkedOutById_fkey" FOREIGN KEY ("checkedOutById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Disk" ("artistName", "barcode", "case", "format", "genre", "id", "img", "location", "name", "style", "year") SELECT "artistName", "barcode", "case", "format", "genre", "id", "img", "location", "name", "style", "year" FROM "Disk";
DROP TABLE "Disk";
ALTER TABLE "new_Disk" RENAME TO "Disk";
CREATE UNIQUE INDEX "Disk_barcode_key" ON "Disk"("barcode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
