/*
  Warnings:

  - You are about to drop the column `hr_max` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `hr_recovery_time` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `hsr_distance` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `max_acceleration` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `max_deceleration` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `percent_in_red_zone` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `player_load` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `power_score` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `sprint_count` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `sprint_distance` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `time_in_red_zone` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `top_speed` on the `activity_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `total_distance` on the `activity_metrics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "activity_metrics" DROP CONSTRAINT "activity_metrics_player_id_fkey";

-- AlterTable
ALTER TABLE "activity_metrics" DROP COLUMN "hr_max",
DROP COLUMN "hr_recovery_time",
DROP COLUMN "hsr_distance",
DROP COLUMN "max_acceleration",
DROP COLUMN "max_deceleration",
DROP COLUMN "percent_in_red_zone",
DROP COLUMN "player_load",
DROP COLUMN "power_score",
DROP COLUMN "sprint_count",
DROP COLUMN "sprint_distance",
DROP COLUMN "time_in_red_zone",
DROP COLUMN "top_speed",
DROP COLUMN "total_distance",
ADD COLUMN     "hrMax" INTEGER,
ADD COLUMN     "hrRecoveryTime" DOUBLE PRECISION,
ADD COLUMN     "hsrDistance" DOUBLE PRECISION,
ADD COLUMN     "maxAcceleration" DOUBLE PRECISION,
ADD COLUMN     "maxDeceleration" DOUBLE PRECISION,
ADD COLUMN     "percentInRedZone" DOUBLE PRECISION,
ADD COLUMN     "playerLoad" DOUBLE PRECISION,
ADD COLUMN     "powerScore" DOUBLE PRECISION,
ADD COLUMN     "sprintCount" INTEGER,
ADD COLUMN     "sprintDistance" DOUBLE PRECISION,
ADD COLUMN     "timeInRedZone" DOUBLE PRECISION,
ADD COLUMN     "topSpeed" DOUBLE PRECISION,
ADD COLUMN     "totalDistance" DOUBLE PRECISION;
