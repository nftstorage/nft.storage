-- Add uniqueness constraint as that is the case in nft.storage and we don't
-- have a data here yet.

ALTER TABLE pin ADD CONSTRAINT pin_content_cid_service_key UNIQUE (content_cid,
                                                                   service);

-- Add aditional value used as per
-- https://github.com/ipfs-shipyard/nft.storage/blob/08654e9e950c4784746ab23873bfe2afe835c3fb/packages/api/db/tables.sql#L21

ALTER TYPE pin_service ADD VALUE 'IpfsCluster2';

