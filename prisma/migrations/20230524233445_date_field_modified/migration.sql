-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "eventID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "ubication" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Events" ("createdAt", "date", "description", "eventID", "title", "ubication") SELECT "createdAt", "date", "description", "eventID", "title", "ubication" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
