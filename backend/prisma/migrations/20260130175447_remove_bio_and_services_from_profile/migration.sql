/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ServiceOffering` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceOffering" DROP CONSTRAINT "ServiceOffering_sitterProfileId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio";

-- DropTable
DROP TABLE "ServiceOffering";
