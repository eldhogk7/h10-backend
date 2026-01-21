/*
  Warnings:

  - A unique constraint covering the columns `[club_id,jersey_number]` on the table `players` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "players_club_id_jersey_number_key" ON "players"("club_id", "jersey_number");
