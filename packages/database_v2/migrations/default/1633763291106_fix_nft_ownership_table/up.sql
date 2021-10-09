ALTER TABLE nft_ownership ALTER COLUMN block_number TYPE bigint USING block_number::bigint;
