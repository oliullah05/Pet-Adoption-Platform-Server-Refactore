-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "bannerPhoto" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'male',
ADD COLUMN     "healthStatus" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "multiplePhotos" TEXT[],
ADD COLUMN     "specialNeeds" TEXT NOT NULL DEFAULT '';
