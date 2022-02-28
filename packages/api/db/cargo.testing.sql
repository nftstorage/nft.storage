CREATE SCHEMA IF NOT EXISTS cargo;

-- This is a copy of the dagcargo schema for testing purposes.
-- https://github.com/nftstorage/dagcargo/blob/master/maint/pg_schema.sql

CREATE TABLE IF NOT EXISTS cargo.aggregate_entries (
  aggregate_cid TEXT NOT NULL,
  cid_v1 TEXT NOT NULL,
  datamodel_selector TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cargo.aggregates (
  aggregate_cid TEXT NOT NULL UNIQUE,
  piece_cid TEXT UNIQUE NOT NULL,
  sha256hex TEXT NOT NULL,
  export_size BIGINT NOT NULL,
  metadata JSONB,
  entry_created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cargo.deals (
  deal_id BIGINT UNIQUE NOT NULL,
  aggregate_cid TEXT NOT NULL,
  client TEXT NOT NULL,
  provider TEXT NOT NULL,
  status TEXT NOT NULL,
  status_meta TEXT,
  start_epoch INTEGER NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_epoch INTEGER NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  sector_start_epoch INTEGER,
  sector_start_time TIMESTAMP WITH TIME ZONE,
  entry_created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  entry_last_updated TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Test data

INSERT INTO cargo.aggregate_entries ("aggregate_cid", "cid_v1", "datamodel_selector") VALUES
('bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e', 'Links/19/Hash/Links/46/Hash/Links/0/Hash');

INSERT INTO cargo.aggregates ("aggregate_cid", "piece_cid", "sha256hex", "export_size", "metadata", "entry_created") VALUES
('bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny', '9ad34a5221cc171dcc61c0862680634ca065c32972ab59f92626b7f2f18ca3fc', 25515304172, '{"Version": 1, "RecordType": "DagAggregate UnixFS"}', '2021-09-09 14:41:14.099613+00');

INSERT INTO cargo.deals ("deal_id", "aggregate_cid", "client", "provider", "status", "start_epoch", "end_epoch", "entry_created", "entry_last_updated", "status_meta", "start_time", "sector_start_epoch", "sector_start_time", "end_time") VALUES
(2424132, 'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'f144zep4gitj73rrujd3jw6iprljicx6vl4wbeavi', 'f0678914', 'active', 1102102, 2570902, '2021-09-09 16:30:52.252233+00', '2021-09-10 00:45:50.408956+00', 'containing sector active as of 2021-09-10 00:36:30 at epoch 1097593', '2021-09-11 14:11:00+00', 1097593, '2021-09-10 00:36:30+00', '2023-02-03 14:11:00+00');

INSERT INTO public."user" (magic_link_id, github_id, name, email, public_address) VALUES ('did:ethr:0x65007A739ab7AC5c537161249b81250E49e2853Z', 'github|000000', 'mock user', 'test@gmail.com', '0x65007A739ab7AC5c537161249b81250E49e2853Z');

INSERT INTO public.auth_key (name, secret, user_id) VALUES ('main', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1MDA3QTczOWFiN0FDNWM1MzcxNjEyNDliODEyNTBFNDllMjg1M0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTc1NDczNjYzOCwibmFtZSI6Im1haW4ifQ.wKwJIRXXHsgwVp8mOQp6r3_F4Lz5lnoAkgVP8wqwA_Y', 1);


-- Count is the most accurate representation of data
-- Creating a materialized views gives us cacheing as well as accuracy for percent difference

CREATE MATERIALIZED VIEW upload_stats AS
	SELECT
    (
        SELECT
        CAST("count"(*) AS float )
        FROM upload
    ) AS total_uploads
	, 
	(
        SELECT 
        CAST("count"(*) AS float )
        FROM upload
        WHERE inserted_at < CURRENT_DATE - 7
    ) AS total_uploads_past_7,
    (
        SELECT 
        CAST("count"(*) AS float )
        FROM cargo.deals
    ) AS total_deals,
    (
        SELECT
        SUM(export_size)
        FROM cargo.aggregates
    ) as total_deal_size
