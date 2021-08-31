/*
  Warnings:

  - Added the required column `description` to the `Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Metadata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Metadata` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('Idle', 'PinQueued', 'Pinned', 'FailedURIParse', 'FailedFetch', 'PinFailure');

-- AlterTable
ALTER TABLE "Metadata" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "status" "ResourceStatus" NOT NULL,
    "uri" TEXT NOT NULL,
    "ipfsURL" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "problem" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ERC721ImportResult" (
    "id" TEXT NOT NULL,
    "nextID" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ERC721ImportResultToToken" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MetadataResources" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource.id_unique" ON "Resource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resource.uri_unique" ON "Resource"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "Resource.ipfsURL_unique" ON "Resource"("ipfsURL");

-- CreateIndex
CREATE UNIQUE INDEX "ERC721ImportResult.id_unique" ON "ERC721ImportResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ERC721ImportResultToToken_AB_unique" ON "_ERC721ImportResultToToken"("A", "B");

-- CreateIndex
CREATE INDEX "_ERC721ImportResultToToken_B_index" ON "_ERC721ImportResultToToken"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MetadataResources_AB_unique" ON "_MetadataResources"("A", "B");

-- CreateIndex
CREATE INDEX "_MetadataResources_B_index" ON "_MetadataResources"("B");

-- AddForeignKey
ALTER TABLE "Metadata" ADD FOREIGN KEY ("imageId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ERC721ImportResultToToken" ADD FOREIGN KEY ("A") REFERENCES "ERC721ImportResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ERC721ImportResultToToken" ADD FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MetadataResources" ADD FOREIGN KEY ("A") REFERENCES "Metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MetadataResources" ADD FOREIGN KEY ("B") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
