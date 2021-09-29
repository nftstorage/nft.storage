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

CREATE OR REPLACE FUNCTION add_nft(
    id text,
    contract_id text,
    token_id text,
    mint_time timestamp with time zone,
    nft_owner_id text,
    token_uri text,
    updated_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
    inserted_at timestamp with time zone DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF nft LANGUAGE plpgsql AS $function$ DECLARE inserted_id TEXT;

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
    ) RETURNING nft.id INTO inserted_id;

RETURN QUERY
SELECT
    *
FROM
    nft
WHERE
    nft.id = inserted_id;

END;

$function$;

CREATE OR REPLACE FUNCTION add_other_nft_resource (
    content_cid text,
    resource_uri text,
    updated_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
    inserted_at timestamp with time zone DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF other_nft_resources LANGUAGE plpgsql AS $function$ DECLARE inserted_cid TEXT;

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
    ) RETURNING other_nft_resources.content_cid INTO inserted_cid;

RETURN QUERY
SELECT
    *
FROM
    other_nft_resources
WHERE
    other_nft_resources.content_cid = inserted_cid;

END;

$function$;

CREATE OR REPLACE FUNCTION add_nft_metadata (
    content_cid text,
    name text,
    description text,
    image_uri text,
    updated_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
    inserted_at timestamp with time zone DEFAULT timezone('utc' :: text, now())
) RETURNS SETOF nft_metadata LANGUAGE plpgsql AS $function$ DECLARE inserted_cid TEXT;

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
    ) RETURNING nft_metadata.content_cid INTO inserted_cid;

RETURN QUERY
SELECT
    *
FROM
    nft_metadata
WHERE
    nft_metadata.content_cid = inserted_cid;

END;

$function$;
