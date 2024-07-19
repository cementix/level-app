/*
  Warnings:

  - The values [STRENGHT] on the enum `EnumStatType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EnumMessageType" AS ENUM ('AI', 'USER');

-- AlterEnum
BEGIN;
CREATE TYPE "EnumStatType_new" AS ENUM ('STRENGTH', 'ENDURANCE', 'INTELLIGENCE', 'AGILITY', 'DISCIPLINE');
ALTER TABLE "Stat" ALTER COLUMN "type" TYPE "EnumStatType_new" USING ("type"::text::"EnumStatType_new");
ALTER TYPE "EnumStatType" RENAME TO "EnumStatType_old";
ALTER TYPE "EnumStatType_new" RENAME TO "EnumStatType";
DROP TYPE "EnumStatType_old";
COMMIT;

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "type" "EnumMessageType" NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
