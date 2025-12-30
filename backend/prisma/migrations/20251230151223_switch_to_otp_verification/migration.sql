/*
  Warnings:

  - You are about to drop the column `emailVerificationExpires` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationExpires",
DROP COLUMN "emailVerificationToken",
ADD COLUMN     "emailOtpAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "emailOtpExpires" TIMESTAMP(3),
ADD COLUMN     "emailOtpHash" TEXT,
ADD COLUMN     "emailOtpLastSentAt" TIMESTAMP(3);
