-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImageUrl" TEXT;

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "imageUrl" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "sitterId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "hasNotification" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_sitterId_scheduledTime_idx" ON "Booking"("sitterId", "scheduledTime");

-- CreateIndex
CREATE INDEX "Booking_ownerId_idx" ON "Booking"("ownerId");

-- CreateIndex
CREATE INDEX "Request_status_createdAt_idx" ON "Request"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SavedRequest_userId_idx" ON "SavedRequest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedRequest_userId_requestId_key" ON "SavedRequest"("userId", "requestId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_sitterId_fkey" FOREIGN KEY ("sitterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRequest" ADD CONSTRAINT "SavedRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRequest" ADD CONSTRAINT "SavedRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
