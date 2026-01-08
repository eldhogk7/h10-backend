/*
  Warnings:

  - You are about to alter the column `acceleration` on the `activity_metrics` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `deceleration` on the `activity_metrics` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `player_id` on the `activity_metrics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "activity_metrics" DROP CONSTRAINT "activity_metrics_player_id_fkey";

-- AlterTable
ALTER TABLE "activity_metrics" DROP COLUMN "player_id",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ALTER COLUMN "acceleration" SET DATA TYPE INTEGER,
ALTER COLUMN "deceleration" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE INDEX "activity_metrics_player_id_idx" ON "activity_metrics"("player_id");
