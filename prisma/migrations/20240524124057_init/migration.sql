-- DropForeignKey
ALTER TABLE "adoption-requests" DROP CONSTRAINT "adoption-requests_petId_fkey";

-- DropForeignKey
ALTER TABLE "adoption-requests" DROP CONSTRAINT "adoption-requests_userId_fkey";

-- AddForeignKey
ALTER TABLE "adoption-requests" ADD CONSTRAINT "adoption-requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption-requests" ADD CONSTRAINT "adoption-requests_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
