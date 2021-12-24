
ALTER TABLE nft ADD FOREIGN KEY (token_uri) REFERENCES nft_asset(token_uri);
ALTER TABLE nft ADD FOREIGN KEY (contract_id) REFERENCES blockchain_contract(id);
ALTER TABLE nft ADD FOREIGN KEY (nft_owner_id) REFERENCES nft_owner(id);

ALTER TABLE nfts_by_blockchain_blocks ADD FOREIGN KEY (blockchain_block_hash) REFERENCES blockchain_block(hash);
ALTER TABLE nfts_by_blockchain_blocks ADD FOREIGN KEY (nft_id) REFERENCES nft(id);


ALTER TABLE nft_asset ADD FOREIGN KEY (content_cid) REFERENCES content(cid);
ALTER TABLE nft_asset ADD FOREIGN KEY (content_cid) REFERENCES nft_metadata(content_cid);


ALTER TABLE nft_metadata ADD FOREIGN KEY (content_cid) REFERENCES content(cid);
alter TABLE nft_metadata ADD FOREIGN KEY (image_uri) REFERENCES resource(uri);

ALTER TABLE other_nft_resources ADD FOREIGN KEY (content_cid) REFERENCES nft_asset(content_cid);
ALTER TABLE other_nft_resources ADD FOREIGN KEY (content_cid) REFERENCES nft_metadata(content_cid);
ALTER TABLE other_nft_resources ADD FOREIGN KEY (resource_uri) REFERENCES resource(uri);

ALTER TABLE resource ADD FOREIGN KEY (content_cid) REFERENCES content(cid);

ALTER TABLE pin ADD FOREIGN KEY (content_cid) REFERENCES content(cid);
ALTER TABLE erc721_import_by_nft ADD FOREIGN KEY (erc721_import_id) REFERENCES erc721_import(id);
ALTER TABLE erc721_import_by_nft ADD FOREIGN KEY (nft_id) REFERENCES nft(id);
