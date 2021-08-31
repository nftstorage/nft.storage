-- CreateTable
CREATE TABLE "Block" (
    "hash" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "tokenID" TEXT NOT NULL,
    "mintTime" TEXT NOT NULL,
    "tokenAssetId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenAsset" (
    "id" TEXT NOT NULL,
    "tokenURI" TEXT NOT NULL,
    "ipnft" TEXT NOT NULL,
    "problem" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" TEXT NOT NULL,
    "cid" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlockToToken" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Block.hash_unique" ON "Block"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Block.number_unique" ON "Block"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Token.id_unique" ON "Token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenAsset.id_unique" ON "TokenAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TokenAsset.tokenURI_unique" ON "TokenAsset"("tokenURI");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata.id_unique" ON "Metadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata.sourceId_unique" ON "Metadata"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "_BlockToToken_AB_unique" ON "_BlockToToken"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockToToken_B_index" ON "_BlockToToken"("B");

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY ("tokenAssetId") REFERENCES "TokenAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD FOREIGN KEY ("sourceId") REFERENCES "TokenAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockToToken" ADD FOREIGN KEY ("A") REFERENCES "Block"("hash") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockToToken" ADD FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
