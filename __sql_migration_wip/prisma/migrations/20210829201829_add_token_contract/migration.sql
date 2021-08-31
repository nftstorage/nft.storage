/*
  Warnings:

  - Added the required column `tokenContractId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "tokenContractId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TokenContract" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "supportsEIP721Metadata" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenContract.id_unique" ON "TokenContract"("id");

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("tokenContractId") REFERENCES "TokenContract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
