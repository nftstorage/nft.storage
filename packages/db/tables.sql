CREATE TYPE public.pin_status AS ENUM (
  'Queued',
  'Pinning',
  'Pinned',
  'Failed'
);

CREATE TYPE public.service AS ENUM (
  'Pinata',
  'IpfsCluster'
);

CREATE TYPE public.upload_type AS ENUM (
  'Car',
  'Blob',
  'Multipart', 
  'Remote',
  'NFT'
);

CREATE TABLE IF NOT EXISTS public.user (
  id BIGSERIAL PRIMARY KEY,
  magic_link_id TEXT,
  github_id TEXT,
  name TEXT NOT NULL,
  picture TEXT,
  github TEXT,
  email TEXT NOT NULL,
  public_address TEXT NOT NULL UNIQUE,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.auth_key (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  secret TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES user ( id ),
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content (
  -- normalized base32 v1
  cid TEXT PRIMARY KEY,
  dag_size BIGINT,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pin (
  id BIGSERIAL PRIMARY KEY,
  status pin_status NOT NULL,
  content_cid TEXT NOT NULL REFERENCES content ( cid ),
  service public.service NOT NULL,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (content_cid, service)
);

CREATE TABLE IF NOT EXISTS public.upload (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user ( id ),
  auth_key_id BIGINT REFERENCES auth_key ( id ),
  source_cid TEXT NOT NULL,
  content_cid TEXT NOT NULL REFERENCES content ( cid ),
  name TEXT,
  type public.upload_type NOT NULL,
  -- MIME type of the upload data as sent in the request.
  mime_type TEXT,
  files jsonb,
  origins jsonb,
  meta jsonb,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
