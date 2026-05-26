/*
  Warnings:

  - You are about to drop the column `hours` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `WorkLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "WorkLog" DROP CONSTRAINT "WorkLog_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hours";

-- CreateIndex
CREATE INDEX "User_companyId_role_idx" ON "User"("companyId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "WorkLog_userId_date_key" ON "WorkLog"("userId", "date");

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
