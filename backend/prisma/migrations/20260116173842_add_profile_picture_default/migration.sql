/*
  Warnings:

  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `idDocumentUrl` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropIndex
DROP INDEX "Document_userId_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNVERIFIED';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "idDocumentUrl";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImageUrl" SET DEFAULT 'uploads/pfps/default_pfp.png';

-- CreateTable
CREATE TABLE "ProfilePicture" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT 'uploads/pfps/default_pfp.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilePicture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePicture_profileId_key" ON "ProfilePicture"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_profileId_key" ON "Document"("profileId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePicture" ADD CONSTRAINT "ProfilePicture_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
