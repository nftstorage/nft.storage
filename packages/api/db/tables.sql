-- Pin status 
CREATE TYPE pin_status_type AS ENUM (
  'Queued',
  'Pinning',
  'Pinned',
  'Failed'
);

-- Pin Services
CREATE TYPE service_type AS ENUM ('Pinata', 'IpfsCluster');

-- Upload Type
CREATE TYPE upload_type AS ENUM (
  'Car',
  'Blob',
  'Multipart',
  'Remote',
  'NFT'
);

-- Create upload table
CREATE TABLE IF NOT EXISTS account (
  id BIGSERIAL PRIMARY KEY,
  magic_link_id TEXT NOT NULL UNIQUE,
  github_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  picture TEXT,
  github TEXT,
  email TEXT NOT NULL,
  public_address TEXT NOT NULL UNIQUE,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_key (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  secret TEXT NOT NULL,
  account_id BIGSERIAL NOT NULL references account (id),
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS content (
  cid TEXT PRIMARY KEY,
  dag_size BIGINT,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS pin (
  pin_id BIGSERIAL PRIMARY KEY,
  status pin_status_type NOT NULL,
  content_cid text NOT NULL references content (cid),
  service service_type NOT NULL,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (content_cid, service)
);


-- removed_at and add the on conflict logic to the function, null or date depending on the situation
-- check cid v1 or v0 logic 
CREATE TABLE IF NOT EXISTS upload (
  id BIGSERIAL PRIMARY KEY,
  account_id BIGSERIAL NOT NULL references account (id),
  key_id BIGSERIAL references auth_key (id),
  content_cid TEXT NOT NULL references content (cid),
  source_cid TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  type upload_type NOT NULL,
  name TEXT,
  files jsonb,
  origins jsonb,
  meta jsonb,
  inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  --deleted_at timestamp with time zone DEFAULT timezone('utc'::text, now())
  UNIQUE (account_id, content_cid)
);