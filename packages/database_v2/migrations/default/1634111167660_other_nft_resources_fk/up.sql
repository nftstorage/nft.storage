ALTER TABLE other_nft_resources ADD
FOREIGN KEY (resource_uri_hash) REFERENCES resource(uri_hash);

ALTER TABLE other_nft_resources ADD
FOREIGN KEY (content_cid) REFERENCES nft_metadata(content_cid);
