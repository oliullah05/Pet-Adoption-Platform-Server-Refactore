-- AlterTable
ALTER TABLE "adoption-requests" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "message" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT '';
