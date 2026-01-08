-- CreateTable
CREATE TABLE "SitterProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "services" TEXT[],
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "bio" TEXT,
    "idDocumentUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SitterProfile_userId_key" ON "SitterProfile"("userId");

-- CreateIndex
CREATE INDEX "SitterProfile_location_idx" ON "SitterProfile"("location");

-- CreateIndex
CREATE INDEX "SitterProfile_pricePerHour_idx" ON "SitterProfile"("pricePerHour");

-- CreateIndex
CREATE INDEX "SitterProfile_isVerified_idx" ON "SitterProfile"("isVerified");

-- AddForeignKey
ALTER TABLE "SitterProfile" ADD CONSTRAINT "SitterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
