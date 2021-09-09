-- CreateEnum
CREATE TYPE "resource_status" AS ENUM ('Idle', 'PinQueued', 'Pinned', 'FailedURIParse', 'FailedFetch', 'PinFailure');

-- CreateEnum
CREATE TYPE "nft_asset_status" AS ENUM ('Queued', 'URIParseFailed', 'ContentFetchFailed', 'ContentParseFailed', 'PinRequestFailed', 'Linked');

-- CreateEnum
CREATE TYPE "pin_status" AS ENUM ('ClusterError', 'PinError', 'PinQueued', 'Pinned', 'Pinning', 'Remote', 'Sharded', 'Undefined', 'UnpinError', 'UnpinQueued', 'Unpinned', 'Unpinning');

-- CreateEnum
CREATE TYPE "pin_service" AS ENUM ('Pinata', 'IpfsCluster');

-- CreateTable
CREATE TABLE "block" (
    "hash" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "nft" (
    "id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "mint_time" TIMESTAMP(3) NOT NULL,
    "nft_asset_id" TEXT NOT NULL,
    "contract_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts_on_blocks" (
    "block_hash" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("block_hash","nft_id")
);

-- CreateTable
CREATE TABLE "nft_asset" (
    "token_uri" TEXT NOT NULL,
    "ipfsURL" TEXT NOT NULL,
    "status" "nft_asset_status" NOT NULL,
    "status_text" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("token_uri")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" TEXT NOT NULL,
    "content_id" TEXT,
    "token_uri" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "imageId" TEXT NOT NULL,
    "image_uri" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource" (
    "status" "resource_status" NOT NULL,
    "status_text" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "ipfs_url" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "cid" TEXT,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("uri")
);

-- CreateTable
CREATE TABLE "resources_on_metadata" (
    "metadata_id" TEXT NOT NULL,
    "resource_uri" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("metadata_id","resource_uri")
);

-- CreateTable
CREATE TABLE "content" (
    "cid" TEXT NOT NULL,
    "dag_size" INTEGER,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "pin" (
    "id" BIGSERIAL NOT NULL,
    "content_cid" TEXT NOT NULL,
    "service" "pin_service" NOT NULL,
    "status" "pin_status" NOT NULL,
    "status_text" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "supports_eip721_metadata" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "erc721_import" (
    "id" TEXT NOT NULL,
    "next_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "erc721_import_to_nft" (
    "erc721_import_id" TEXT NOT NULL,
    "nft_id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("erc721_import_id","nft_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "block.hash_unique" ON "block"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "block.number_unique" ON "block"("number");

-- CreateIndex
CREATE UNIQUE INDEX "nft.id_unique" ON "nft"("id");

-- CreateIndex
CREATE UNIQUE INDEX "nft_asset.token_uri_unique" ON "nft_asset"("token_uri");

-- CreateIndex
CREATE UNIQUE INDEX "metadata.id_unique" ON "metadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata.token_uri_unique" ON "metadata"("token_uri");

-- CreateIndex
CREATE UNIQUE INDEX "resource.uri_unique" ON "resource"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "resource.ipfs_url_unique" ON "resource"("ipfs_url");

-- CreateIndex
CREATE UNIQUE INDEX "content.cid_unique" ON "content"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "pin.id_unique" ON "pin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contract.id_unique" ON "contract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "erc721_import.id_unique" ON "erc721_import"("id");

-- AddForeignKey
ALTER TABLE "nft" ADD FOREIGN KEY ("nft_asset_id") REFERENCES "nft_asset"("token_uri") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft" ADD FOREIGN KEY ("contract_id") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts_on_blocks" ADD FOREIGN KEY ("block_hash") REFERENCES "block"("hash") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts_on_blocks" ADD FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD FOREIGN KEY ("token_uri") REFERENCES "nft_asset"("token_uri") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD FOREIGN KEY ("cid") REFERENCES "content"("cid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources_on_metadata" ADD FOREIGN KEY ("metadata_id") REFERENCES "metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources_on_metadata" ADD FOREIGN KEY ("resource_uri") REFERENCES "resource"("uri") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin" ADD FOREIGN KEY ("content_cid") REFERENCES "content"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erc721_import_to_nft" ADD FOREIGN KEY ("erc721_import_id") REFERENCES "erc721_import"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erc721_import_to_nft" ADD FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
