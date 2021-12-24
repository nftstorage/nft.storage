-- Add adittional state to the nft_asset

ALTER TYPE nft_asset_status ADD VALUE 'Parsed';

-- NOTE: this needs to be separate migration because
-- 55P04: New enum values must be committed before they can be used.
