CREATE VIEW nft_asset_view AS
SELECT
    token_uri,
    ipfs_url,
    content_cid,
    status,
    status_text,
    updated_at,
    inserted_at
FROM
    nft_asset
WHERE
    token_uri_hash = digest(token_uri, 'sha256');

CREATE VIEW resource_view AS
SELECT
    uri,
    status,
    status_text,
    ipfs_url,
    content_cid,
    updated_at,
    inserted_at
FROM
    resource
WHERE
    uri_hash = digest(uri, 'sha256');

CREATE FUNCTION add_nft (
    id nft.id % TYPE,
    contract_id nft.contract_id % TYPE,
    token_id nft.token_id % TYPE,
    mint_time nft.mint_time % TYPE,
    token_uri nft_asset.token_uri % TYPE,
    nft_owner_id nft.nft_owner_id % TYPE,
    updated_at nft.updated_at % TYPE DEFAULT timezone('utc' :: text, now()),
    inserted_at nft.inserted_at % TYPE DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF nft LANGUAGE plpgsql AS $$
DECLARE
    inserted_id text;

BEGIN
    INSERT INTO
        nft (
            id,
            contract_id,
            token_id,
            mint_time,
            nft_owner_id,
            token_uri_hash,
            updated_at,
            inserted_at
        )
    VALUES
        (
            id,
            contract_id,
            token_id,
            mint_time,
            nft_owner_id,
            digest(token_uri, 'sha256'),
            updated_at,
            inserted_at
        ) ON CONFLICT ON CONSTRAINT nft_pkey DO
    UPDATE
    SET
        updated_at = EXCLUDED.updated_at,
        nft_owner_id = EXCLUDED.nft_owner_id RETURNING nft.id INTO inserted_id;

RETURN QUERY
SELECT
    *
FROM
    nft
WHERE
    nft.id = inserted_id;

END;

$$;

CREATE FUNCTION add_other_nft_resource (
    content_cid other_nft_resources.content_cid % TYPE,
    resource_uri resource .uri % TYPE,
    updated_at other_nft_resources.updated_at % TYPE DEFAULT timezone('utc' :: text, now()),
    inserted_at other_nft_resources.inserted_at % TYPE DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF other_nft_resources LANGUAGE plpgsql AS $$
DECLARE
    inserted_cid other_nft_resources.content_cid % TYPE;

BEGIN
    INSERT INTO
        other_nft_resources (
            content_cid,
            resource_uri_hash,
            updated_at,
            inserted_at
        )
    VALUES
        (
            content_cid,
            digest(resource_uri, 'sha256'),
            updated_at,
            inserted_at
        ) ON CONFLICT ON CONSTRAINT other_nft_resources_pkey DO
    UPDATE
    SET
        updated_at = EXCLUDED.updated_at RETURNING other_nft_resources.content_cid INTO inserted_cid;

RETURN QUERY
SELECT
    *
FROM
    other_nft_resources
WHERE
    other_nft_resources.content_cid = inserted_cid;

END;

$$;

CREATE FUNCTION add_nft_metadata (
    content_cid text,
    name text,
    description text,
    image_uri text,
    updated_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
    inserted_at timestamp with time zone DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF nft_metadata LANGUAGE plpgsql AS $$
DECLARE
    inserted_cid text;

BEGIN
    INSERT INTO
        nft_metadata (
            content_cid,
            name,
            description,
            image_uri_hash,
            updated_at,
            inserted_at
        )
    VALUES
        (
            content_cid,
            name,
            description,
            digest(image_uri, 'sha256'),
            updated_at,
            inserted_at
        ) ON CONFLICT ON CONSTRAINT nft_metadata_pkey DO
    UPDATE
    SET
        updated_at = EXCLUDED.updated_at,
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        image_uri_hash = EXCLUDED.image_uri_hash RETURNING nft_metadata.content_cid INTO inserted_cid;

RETURN QUERY
SELECT
    *
FROM
    nft_metadata
WHERE
    nft_metadata.content_cid = inserted_cid;

END;

$$;
