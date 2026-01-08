/*
  Warnings:

  - Added the required column `session_id` to the `activity_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_metrics" ADD COLUMN     "session_id" TEXT NOT NULL,
ALTER COLUMN "recorded_at" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "activity_metrics_session_id_idx" ON "activity_metrics"("session_id");
