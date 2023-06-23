-- CreateTable
CREATE TABLE "Announcement" (
    "announcementID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titlt" TEXT NOT NULL,
    "announmedntDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Activity" (
    "activitieID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "announcementID" INTEGER NOT NULL,
    CONSTRAINT "Activity_announcementID_fkey" FOREIGN KEY ("announcementID") REFERENCES "Announcement" ("announcementID") ON DELETE RESTRICT ON UPDATE CASCADE
);
