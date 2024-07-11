/*
  Warnings:

  - Added the required column `title` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "title" TEXT NOT NULL;
