/*
  Warnings:

  - You are about to drop the column `dob` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `idNumber` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `rawText` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "dob",
DROP COLUMN "idNumber",
DROP COLUMN "rawText";
