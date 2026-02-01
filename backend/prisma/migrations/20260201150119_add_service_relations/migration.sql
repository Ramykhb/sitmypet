/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `Post` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "serviceId" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN "serviceId" TEXT;

-- Get a default serviceId (assuming at least one service exists; adjust if needed)
UPDATE "Booking" SET "serviceId" = (SELECT id FROM "Service" LIMIT 1) WHERE "serviceId" IS NULL;
UPDATE "Post" SET "serviceId" = (SELECT id FROM "Service" LIMIT 1) WHERE "serviceId" IS NULL;

-- Now make serviceId NOT NULL and add foreign keys
ALTER TABLE "Booking" ALTER COLUMN "serviceId" SET NOT NULL;
ALTER TABLE "Post" ALTER COLUMN "serviceId" SET NOT NULL;

ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post" ADD CONSTRAINT "Post_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;