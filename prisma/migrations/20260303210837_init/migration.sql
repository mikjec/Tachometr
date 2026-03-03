/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'BOSS', 'EMPLOYEE');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "hourlyRate" DOUBLE PRECISION,
    "companyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
