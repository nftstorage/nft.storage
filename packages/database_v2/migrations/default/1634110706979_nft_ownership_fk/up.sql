ALTER TABLE nft_ownership ADD
FOREIGN KEY (nft_id) REFERENCES nft(id);


ALTER TABLE nft_ownership ADD
FOREIGN KEY (block_number) REFERENCES blockchain_block(number);
