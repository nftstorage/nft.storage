-- nft.token_uri_hash -> nft_asset.token_uri_hash

ALTER TABLE nft ADD
FOREIGN KEY (token_uri_hash) REFERENCES nft_asset(token_uri_hash);

-- nft.contract_id -> blockchain_contract.id

ALTER TABLE nft ADD
FOREIGN KEY (contract_id) REFERENCES blockchain_contract(id);

-- nft_asset.metadata_cid -> content.cid

ALTER TABLE nft_asset ADD CONSTRAINT nft_asset_content_cid_fkey
FOREIGN KEY (metadata_cid) REFERENCES content(cid);

-- nft_ownership.nft_id -> nft.id

ALTER TABLE nft_ownership ADD
FOREIGN KEY (nft_id) REFERENCES nft(id);

-- nft_ownership.block_number -> blockchain_block.number

ALTER TABLE nft_ownership ADD
FOREIGN KEY (block_number) REFERENCES blockchain_block(number);

-- nfts_by_blockchain_blocks.blockchain_block_hash -> blockchain_block.hash

ALTER TABLE nfts_by_blockchain_blocks ADD
FOREIGN KEY (blockchain_block_hash) REFERENCES blockchain_block(hash);

-- nfts_by_blockchain_blocks.nft_id -> nft.id

ALTER TABLE nfts_by_blockchain_blocks ADD
FOREIGN KEY (nft_id) REFERENCES nft(id);

-- other_nft_resources.resource_uri_hash -> resource.uri_hash

ALTER TABLE other_nft_resources ADD
FOREIGN KEY (resource_uri_hash) REFERENCES resource(uri_hash);

-- other_nft_resources.metadata_cid -> nft_metadata.cid

ALTER TABLE other_nft_resources ADD
FOREIGN KEY (metadata_cid) REFERENCES nft_metadata(cid);

-- resource.content_cid -> content.cid

ALTER TABLE resource ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);

-- pin.content_cid -> content.cid

ALTER TABLE pin ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);

-- nft_metadata.image_uri_hash -> resource.uri_hash

ALTER TABLE nft_metadata ADD
FOREIGN KEY (image_uri_hash) REFERENCES resource(uri_hash);

-- metadata.cid -> content.cid

ALTER TABLE nft_metadata ADD
FOREIGN KEY (cid) REFERENCES content(cid);

-- nft_asset.metadata_cid -> metadata.cid

ALTER TABLE nft_asset ADD
FOREIGN KEY (metadata_cid) REFERENCES nft_metadata(cid);

