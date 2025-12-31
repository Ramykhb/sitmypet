/*
  Warnings:

  - You are about to drop the column `emailOtpLastSentAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetOtpLastSentAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailOtpLastSentAt",
DROP COLUMN "passwordResetOtpLastSentAt";
