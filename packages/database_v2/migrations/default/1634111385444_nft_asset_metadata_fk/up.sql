ALTER TABLE nft_asset ADD
FOREIGN KEY (content_cid) REFERENCES nft_metadata(content_cid);
