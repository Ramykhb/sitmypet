-- CreateTable
CREATE TABLE "SavedSitter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sitterProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedSitter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedSitter_userId_idx" ON "SavedSitter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedSitter_userId_sitterProfileId_key" ON "SavedSitter"("userId", "sitterProfileId");

-- AddForeignKey
ALTER TABLE "SavedSitter" ADD CONSTRAINT "SavedSitter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedSitter" ADD CONSTRAINT "SavedSitter_sitterProfileId_fkey" FOREIGN KEY ("sitterProfileId") REFERENCES "SitterProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
