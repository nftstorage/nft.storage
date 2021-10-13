ALTER TABLE nfts_by_blockchain_blocks ADD
FOREIGN KEY (blockchain_block_hash) REFERENCES blockchain_block(hash);

ALTER TABLE nfts_by_blockchain_blocks ADD
FOREIGN KEY (nft_id) REFERENCES nft(id);
