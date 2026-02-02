/*
  Warnings:

  - A unique constraint covering the columns `[pod_id]` on the table `player_pods` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "heartrate" INTEGER,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "player_pods_pod_id_key" ON "player_pods"("pod_id");
