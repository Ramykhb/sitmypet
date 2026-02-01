-- AlterTable
ALTER TABLE "Profile" DROP COLUMN IF EXISTS "location";
ALTER TABLE "Profile" ADD COLUMN "locationId" TEXT;

ALTER TABLE "Profile" ADD CONSTRAINT "Profile_locationId_fkey"
  FOREIGN KEY ("locationId") REFERENCES "Location"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
