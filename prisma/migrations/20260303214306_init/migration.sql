/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hourlyRate",
ADD COLUMN     "hours" DOUBLE PRECISION;
