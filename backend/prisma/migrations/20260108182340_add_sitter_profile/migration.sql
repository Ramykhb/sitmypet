/*
  Warnings:

  - You are about to drop the column `idDocumentUrl` on the `SitterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `SitterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerHour` on the `SitterProfile` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `SitterProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SitterProfile_isVerified_idx";

-- DropIndex
DROP INDEX "SitterProfile_location_idx";

-- DropIndex
DROP INDEX "SitterProfile_pricePerHour_idx";

-- AlterTable
ALTER TABLE "SitterProfile" DROP COLUMN "idDocumentUrl",
DROP COLUMN "isVerified",
DROP COLUMN "pricePerHour",
DROP COLUMN "services";

-- CreateTable
CREATE TABLE "ServiceOffering" (
    "id" TEXT NOT NULL,
    "sitterProfileId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOffering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceOffering_sitterProfileId_idx" ON "ServiceOffering"("sitterProfileId");

-- CreateIndex
CREATE INDEX "ServiceOffering_serviceType_idx" ON "ServiceOffering"("serviceType");

-- AddForeignKey
ALTER TABLE "ServiceOffering" ADD CONSTRAINT "ServiceOffering_sitterProfileId_fkey" FOREIGN KEY ("sitterProfileId") REFERENCES "SitterProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
