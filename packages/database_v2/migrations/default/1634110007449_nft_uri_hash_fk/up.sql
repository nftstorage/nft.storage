ALTER TABLE nft ADD
FOREIGN KEY (token_uri_hash) REFERENCES nft_asset(token_uri_hash);
