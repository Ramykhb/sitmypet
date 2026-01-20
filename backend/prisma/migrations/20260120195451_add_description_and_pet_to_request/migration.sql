/*
  Warnings:

  - Added the required column `description` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "petId" TEXT;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
