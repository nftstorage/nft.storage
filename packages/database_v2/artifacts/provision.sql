-- CreateEnum
CREATE TYPE "resource_status" AS ENUM ('Idle', 'PinQueued', 'Pinned', 'FailedURIParse', 'FailedFetch', 'PinFailure');

-- CreateEnum
CREATE TYPE "token_asset_status" AS ENUM ('Queued', 'Failed', 'Succeeded');

-- CreateEnum
CREATE TYPE "pin_status" AS ENUM ('Failed', 'Pinned', 'Pinning', 'Queued');

-- CreateEnum
CREATE TYPE "pin_service" AS ENUM ('Pinata', 'IpfsCluster');

-- CreateTable
CREATE TABLE "block" (
    "hash" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "mint_time" TIMESTAMP(3) NOT NULL,
    "token_asset_id" TEXT NOT NULL,
    "token_contract_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens_on_blocks" (
    "block_hash" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("block_hash","token_id")
);

-- CreateTable
CREATE TABLE "token_asset" (
    "id" TEXT NOT NULL,
    "token_uri" TEXT NOT NULL,
    "ipnft" TEXT NOT NULL,
    "problem" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" TEXT NOT NULL,
    "cid" TEXT,
    "source_id" TEXT NOT NULL,
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
CREATE TABLE "token_contract" (
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
CREATE TABLE "erc721_import_to_token" (
    "erc721_import_id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "inserted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("erc721_import_id","token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "block.hash_unique" ON "block"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "block.number_unique" ON "block"("number");

-- CreateIndex
CREATE UNIQUE INDEX "token.id_unique" ON "token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "token_asset.id_unique" ON "token_asset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "token_asset.token_uri_unique" ON "token_asset"("token_uri");

-- CreateIndex
CREATE UNIQUE INDEX "metadata.id_unique" ON "metadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "metadata.source_id_unique" ON "metadata"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "resource.uri_unique" ON "resource"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "resource.ipfs_url_unique" ON "resource"("ipfs_url");

-- CreateIndex
CREATE UNIQUE INDEX "content.cid_unique" ON "content"("cid");

-- CreateIndex
CREATE UNIQUE INDEX "pin.id_unique" ON "pin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "token_contract.id_unique" ON "token_contract"("id");

-- CreateIndex
CREATE UNIQUE INDEX "erc721_import.id_unique" ON "erc721_import"("id");

-- AddForeignKey
ALTER TABLE "token" ADD FOREIGN KEY ("token_asset_id") REFERENCES "token_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD FOREIGN KEY ("token_contract_id") REFERENCES "token_contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens_on_blocks" ADD FOREIGN KEY ("block_hash") REFERENCES "block"("hash") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens_on_blocks" ADD FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "metadata" ADD FOREIGN KEY ("source_id") REFERENCES "token_asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resource" ADD FOREIGN KEY ("cid") REFERENCES "content"("cid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources_on_metadata" ADD FOREIGN KEY ("metadata_id") REFERENCES "metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources_on_metadata" ADD FOREIGN KEY ("resource_uri") REFERENCES "resource"("uri") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin" ADD FOREIGN KEY ("content_cid") REFERENCES "content"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erc721_import_to_token" ADD FOREIGN KEY ("erc721_import_id") REFERENCES "erc721_import"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erc721_import_to_token" ADD FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
