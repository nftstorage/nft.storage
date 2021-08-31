/*
  Warnings:

  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Resource` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Metadata" DROP CONSTRAINT "Metadata_imageId_fkey";

-- DropForeignKey
ALTER TABLE "_MetadataResources" DROP CONSTRAINT "_MetadataResources_B_fkey";

-- DropIndex
DROP INDEX "Resource.id_unique";

-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("uri");

-- AddForeignKey
ALTER TABLE "Metadata" ADD FOREIGN KEY ("imageId") REFERENCES "Resource"("uri") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MetadataResources" ADD FOREIGN KEY ("B") REFERENCES "Resource"("uri") ON DELETE CASCADE ON UPDATE CASCADE;
