-- CreateTable
CREATE TABLE "hr_zones" (
    "zone_id" UUID NOT NULL,
    "player_id" UUID NOT NULL,
    "zone_number" INTEGER NOT NULL,
    "min_hr" INTEGER NOT NULL,
    "max_hr" INTEGER NOT NULL,

    CONSTRAINT "hr_zones_pkey" PRIMARY KEY ("zone_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hr_zones_player_id_zone_number_key" ON "hr_zones"("player_id", "zone_number");

-- AddForeignKey
ALTER TABLE "hr_zones" ADD CONSTRAINT "hr_zones_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;
