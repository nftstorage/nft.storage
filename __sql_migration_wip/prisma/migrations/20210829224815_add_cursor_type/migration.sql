-- CreateEnum
CREATE TYPE "TokenAssetStatus" AS ENUM ('Queued', 'Failed', 'Succeeded');

-- CreateTable
CREATE TABLE "Cursor" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cursor.id_unique" ON "Cursor"("id");
