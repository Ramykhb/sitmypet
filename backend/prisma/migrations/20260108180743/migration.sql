/*
  Warnings:

  - You are about to drop the `SitterProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SitterProfile" DROP CONSTRAINT "SitterProfile_userId_fkey";

-- DropTable
DROP TABLE "SitterProfile";
