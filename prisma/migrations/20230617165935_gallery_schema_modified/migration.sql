/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Gallery` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gallery_name_key" ON "Gallery"("name");
