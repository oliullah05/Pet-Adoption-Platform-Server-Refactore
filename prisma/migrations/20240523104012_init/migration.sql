-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'deactive', 'blocked');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
