-- nft.token_uri_hash -> nft_asset.token_uri_hash

ALTER TABLE nft
DROP CONSTRAINT nft_token_uri_hash_fkey;

-- nft.contract_id -> blockchain_contract.id

ALTER TABLE nft
DROP CONSTRAINT nft_contract_id_fkey;

-- nft_asset.metadata_cid -> content.cid

ALTER TABLE nft_asset
DROP CONSTRAINT nft_asset_content_cid_fkey;

-- nft_ownership.nft_id -> nft.id

ALTER TABLE nft_ownership
DROP CONSTRAINT nft_ownership_nft_id_fkey;

-- nft_ownership.block_number -> blockchain_block.number

ALTER TABLE nft_ownership
DROP CONSTRAINT nft_ownership_block_number_fkey;

-- nfts_by_blockchain_blocks.nft_id -> nft.id

ALTER TABLE nfts_by_blockchain_blocks
DROP CONSTRAINT nfts_by_blockchain_blocks_blockchain_block_hash_fkey;

-- other_nft_resources.resource_uri_hash -> resource.uri_hash

ALTER TABLE nfts_by_blockchain_blocks
DROP CONSTRAINT nfts_by_blockchain_blocks_nft_id_fkey;

-- other_nft_resources.metadata_cid -> nft_metadata.cid

ALTER TABLE other_nft_resources
DROP CONSTRAINT other_nft_resources_resource_uri_hash_fkey;

-- other_nft_resources.metadata_cid -> nft_metadata.cid

ALTER TABLE other_nft_resources
DROP CONSTRAINT other_nft_resources_metadata_cid_fkey;

-- resource.content_cid -> content.cid

ALTER TABLE resource
DROP CONSTRAINT resource_content_cid_fkey;

-- pin.content_cid -> content.cid

ALTER TABLE pin
DROP CONSTRAINT pin_content_cid_fkey;

-- nft_metadata.image_uri_hash -> resource.uri_hash

ALTER TABLE nft_metadata
DROP CONSTRAINT nft_metadata_image_uri_hash_fkey;

-- metadata.cid -> content.cid

ALTER TABLE nft_metadata ADD
DROP CONSTRAINT nft_metadata_cid_fkey;

-- nft_asset.metadata_cid -> metadata.cid

ALTER TABLE nft_asset
DROP CONSTRAINT nft_asset_metadata_cid_fkey;

