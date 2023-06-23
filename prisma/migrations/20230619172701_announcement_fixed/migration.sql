/*
  Warnings:

  - You are about to drop the column `titlt` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `title` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Announcement" (
    "announcementID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "announmedntDate" DATETIME NOT NULL
);
INSERT INTO "new_Announcement" ("announcementID", "announmedntDate") SELECT "announcementID", "announmedntDate" FROM "Announcement";
DROP TABLE "Announcement";
ALTER TABLE "new_Announcement" RENAME TO "Announcement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
