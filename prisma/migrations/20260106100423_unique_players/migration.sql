/*
  Warnings:

  - A unique constraint covering the columns `[session_id,player_id]` on the table `activity_metrics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "activity_metrics_player_id_idx";

-- DropIndex
DROP INDEX "activity_metrics_session_id_idx";

-- CreateIndex
CREATE UNIQUE INDEX "activity_metrics_session_id_player_id_key" ON "activity_metrics"("session_id", "player_id");
