-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetOtpAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passwordResetOtpExpires" TIMESTAMP(3),
ADD COLUMN     "passwordResetOtpHash" TEXT,
ADD COLUMN     "passwordResetOtpLastSentAt" TIMESTAMP(3);
