CREATE SCHEMA nftstorage;

CREATE TYPE nftstorage.pin_status AS ENUM (
  'Queued',
  'Pinning',
  'Pinned',
  'Failed'
);

CREATE TYPE nftstorage.service AS ENUM (
  'Pinata',
  'IpfsCluster'
);

CREATE TYPE nftstorage.upload_type AS ENUM (
  'Car',
  'Blob',
  'Multipart'
);

CREATE TABLE IF NOT EXISTS nftstorage.user (
  id BIGSERIAL PRIMARY KEY,
  issuer TEXT,
  sub TEXT,
  name TEXT NOT NULL,
  picture TEXT,
  github TEXT,
  email TEXT NOT NULL,
  public_address TEXT NOT NULL UNIQUE,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS nftstorage.auth_key (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  secret TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES user ( id ),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS nftstorage.content (
  -- normalized base32 v1
  cid TEXT PRIMARY KEY,
  dag_size BIGINT,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS nftstorage.pin (
  id BIGSERIAL PRIMARY KEY,
  status pin_status NOT NULL,
  content_cid TEXT NOT NULL REFERENCES content ( cid ),
  service nftstorage.service NOT NULL,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (content_cid, service)
);

CREATE TABLE IF NOT EXISTS nftstorage.upload (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user ( id ),
  auth_key_id BIGINT REFERENCES auth_key ( id ),
  source_cid text NOT NULL,
  content_cid text NOT NULL REFERENCES content ( cid ),
  name TEXT,
  type nftstorage.upload_type NOT NULL,
  files jsonb,
  origins jsonb,
  meta jsonb,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);
