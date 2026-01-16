/*
  Warnings:

  - You are about to drop the `SitterProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SavedSitter" DROP CONSTRAINT "SavedSitter_sitterProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOffering" DROP CONSTRAINT "ServiceOffering_sitterProfileId_fkey";

-- DropForeignKey
ALTER TABLE "SitterProfile" DROP CONSTRAINT "SitterProfile_userId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SitterProfile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idDocumentUrl" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_userId_key" ON "Document"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOffering" ADD CONSTRAINT "ServiceOffering_sitterProfileId_fkey" FOREIGN KEY ("sitterProfileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSitter" ADD CONSTRAINT "SavedSitter_sitterProfileId_fkey" FOREIGN KEY ("sitterProfileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
