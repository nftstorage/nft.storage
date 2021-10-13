ALTER TABLE nft_metadata ADD
FOREIGN KEY (image_uri_hash) REFERENCES resource(uri_hash);
