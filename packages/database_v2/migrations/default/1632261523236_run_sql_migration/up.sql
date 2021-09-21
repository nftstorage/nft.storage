-- rename the existing type
ALTER TYPE nft_asset_status RENAME TO nft_asset_status_old;

-- create the new type
-- As per EIP-721 token asset is identified by a `tokenURI` that MAY
-- point to a JSON file that conforms to the "ERC721 Metadata JSON Schema.
-- Here we represent nft asset by a state machine in which states are identified
-- by a `status` field from this enum.
CREATE TYPE nft_asset_status AS ENUM (
    -- nft asset was created from `tokenURI` is queued for processing.
    -- {
    --    status: 'Queued'
    --    token_uri: string
    --    status_text: string
    -- }
    'Queued',
    -- Failed to parse uri (it is invalid or maybe protocol isn't supproted)
    -- {
    --    status: 'URIParseFailed'
    --    token_uri: string
    --    status_text: string
    --  }
    'URIParseFailed',
    -- Failed to fetch content from `token_uri`. It may have `ipfs_uri` if it
    -- was possible to derive it from the `token_uri`.
    -- {
    --    status: 'ContentFetchFailed'
    --    token_uri: string
    --    status_text: string
    --    ipfs_uri: string|null
    -- }
    'ContentFetchFailed',
    -- Failed to parse content from `token_uri` as per ERC721 Metadata JSON
    -- schema.
    -- {
    --    status: 'ContentParseFailed'
    --    token_uri: string
    --    status_text: string
    --    ipfs_uri: string|null
    -- }
    'ContentParseFailed',
    -- Resource that we failed to submit pin request for. If it has `ipfsURI`
    -- we've send a request to a cluster asking to pin given cid and it may have
    -- failed. If we could not derive ipfsURI we've tried fetching data and then
    -- we've send it to ipfs cluster to add to the network and pin, but cluster
    -- failed. It also maybe that cluster took too long to respond so we've
    -- aborted request. In any case this indicates some issue with cluster.
    -- {
    --    status: 'PinRequestFailed'
    --    token_uri: string, statusText: string
    --    status_text: string
    --    ipfs_uri: string|null
    --  }
    'Linked'
);


-- update the columns to use the new type
ALTER TABLE nft_asset ALTER COLUMN status TYPE nft_asset_status USING status::text::nft_asset_status;

-- remove the old type
DROP TYPE nft_asset_status_old;
