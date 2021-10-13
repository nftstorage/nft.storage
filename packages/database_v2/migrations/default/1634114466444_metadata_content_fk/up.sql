-- Fill the content table
INSERT INTO content (cid, inserted_at, updated_at)
SELECT
    content_cid,
    inserted_at,
    updated_at
FROM
    nft_asset
WHERE
    content_cid is not NULL;
-- Fill the pin table    
INSERT INTO pin (content_cid, service, status, inserted_at, updated_at)
SELECT
    content_cid,
    'IpfsCluster2'::pin_service as service,
    'PinQueued'::pin_status as status,
    inserted_at,
    updated_at
FROM
    nft_asset
WHERE
    content_cid is not NULL;

ALTER TABLE nft_metadata ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);

ALTER TABLE nft_asset ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);
