/*
  Warnings:

  - Added the required column `startAt` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
