/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "serviceType";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "serviceType";
