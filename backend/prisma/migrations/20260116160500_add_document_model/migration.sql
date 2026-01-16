-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "rawText" TEXT NOT NULL,
    "idNumber" TEXT,
    "dob" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
