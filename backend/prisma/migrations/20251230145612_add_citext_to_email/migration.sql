-- Enable CITEXT extension
CREATE EXTENSION IF NOT EXISTS citext;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3),
ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "email" SET DATA TYPE CITEXT;
