/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `adoption-requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "adoption-requests_userId_key" ON "adoption-requests"("userId");
