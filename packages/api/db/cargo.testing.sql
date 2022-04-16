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

CREATE TABLE IF NOT EXISTS cargo.metrics (
  name TEXT NOT NULL,
  dimensions TEXT[],
  description TEXT NOT NULL,
  value BIGINT,
  collected_at TIMESTAMP WITH TIME ZONE,
  collection_took_seconds NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS cargo.metrics_log (
  name TEXT NOT NULL,
  dimensions TEXT[],
  value BIGINT,
  collected_at TIMESTAMP WITH TIME ZONE
);

-- Test data

INSERT INTO cargo.metrics_log (name, dimensions, value, collected_at) VALUES
  ('dagcargo_project_bytes_in_active_deals', '{{project,staging.nft.storage}}', 167859554927623, '2022-04-01 13:41:08.479404+00');

 INSERT INTO cargo.metrics_log (name, dimensions, value, collected_at) VALUES
  ('dagcargo_project_bytes_in_active_deals', '{{project,nft.storage}}', 169334115720738, '2022-03-01 16:33:28.505513+00');

INSERT INTO cargo.aggregate_entries ("aggregate_cid", "cid_v1", "datamodel_selector") VALUES
('bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e', 'Links/19/Hash/Links/46/Hash/Links/0/Hash');

INSERT INTO cargo.aggregates ("aggregate_cid", "piece_cid", "sha256hex", "export_size", "metadata", "entry_created") VALUES
('bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny', '9ad34a5221cc171dcc61c0862680634ca065c32972ab59f92626b7f2f18ca3fc', 25515304172, '{"Version": 1, "RecordType": "DagAggregate UnixFS"}', '2021-09-09 14:41:14.099613+00');

INSERT INTO cargo.deals ("deal_id", "aggregate_cid", "client", "provider", "status", "start_epoch", "end_epoch", "entry_created", "entry_last_updated", "status_meta", "start_time", "sector_start_epoch", "sector_start_time", "end_time") VALUES
(2424132, 'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme', 'f144zep4gitj73rrujd3jw6iprljicx6vl4wbeavi', 'f0678914', 'active', 1102102, 2570902, '2021-09-09 16:30:52.252233+00', '2021-09-10 00:45:50.408956+00', 'containing sector active as of 2021-09-10 00:36:30 at epoch 1097593', '2021-09-11 14:11:00+00', 1097593, '2021-09-10 00:36:30+00', '2023-02-03 14:11:00+00');


INSERT INTO public."user" (magic_link_id, github_id, name, email, public_address) VALUES ('did:ethr:0x65007A739ab7AC5c537161249b81250E49e2853C', 'github|000000', 'mock user', 'test@gmail.com', '0x65007A739ab7AC5c537161249b81250E49e2853C');
INSERT INTO public.auth_key (name, secret, user_id) VALUES ('main', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY1MDA3QTczOWFiN0FDNWM1MzcxNjEyNDliODEyNTBFNDllMjg1M0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTc1NDczNjYzOCwibmFtZSI6Im1haW4ifQ.wKwJIRXXHsgwVp8mOQp6r3_F4Lz5lnoAkgVP8wqwA_Y', 1);

-- More Test Data
INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_inactive', '{{count,2}}', 'Count of items exclusively from inactive sources', null, '2022-04-11 21:25:02.228596+00', 0.236);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_inactive', '{{count,0}}', 'Count of items exclusively from inactive sources', null, '2022-04-11 21:25:02.229901+00', 0.236);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_oversized_deduplicated', '{{project,staging.web3.storage}}', 'Amount of bytes in dags larger than a 32GiB sector not marked for deletion', 0, '2022-04-14 23:50:02.4172+00', 0.906);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_oversized_deduplicated', '{{project,web3.storage}}', 'Amount of bytes in dags larger than a 32GiB sector not marked for deletion', 23732908255926, '2022-04-14 23:50:02.41814+00', 0.906);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first published deal for entries added in the past 7 days', 248, '2022-04-14 23:57:55.642522+00', 474.092);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 1086, '2022-04-14 23:57:55.805621+00', 474.243);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_oversized_deduplicated', '{{project,nft.storage}}', 'Amount of bytes in dags larger than a 32GiB sector not marked for deletion', 8785470055988, '2022-04-14 23:50:02.419441+00', 0.906);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_in_active_deals', '{{project,staging.web3.storage}}', 'Count of aggregated items with at least one active deal per project', 1438, '2022-04-14 23:56:46.803497+00', 405.292);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_in_active_deals', '{{project,nft.storage}}', 'Count of aggregated items with at least one active deal per project', 56426047, '2022-04-14 23:56:46.806892+00', 405.292);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first published deal for entries added in the past 7 days', 360, '2022-04-14 23:57:55.643791+00', 474.092);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_in_active_deals', '{{project,nft.storage}}', 'Amount of per-DAG-deduplicated bytes with at least one active deal per project', 169389985753391, '2022-04-14 23:51:45.76915+00', 104.256);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first active deal for entries added in the past 7 days', 565, '2022-04-14 23:57:55.625541+00', 474.075);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first active deal for entries added in the past 7 days', 701, '2022-04-14 23:57:55.62655+00', 474.075);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first active deal for entries added in the past 7 days', 1410, '2022-04-14 23:57:55.627754+00', 474.075);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 300, '2022-04-14 23:57:55.757602+00', 474.199);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 1 days', null, '2022-04-14 23:52:21.606712+00', 140.089);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 1 days', 138, '2022-04-14 23:52:21.608101+00', 140.089);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 1 days', 232, '2022-04-14 23:52:21.608982+00', 140.089);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first published deal for entries added in the past 1 days', 360, '2022-04-14 23:52:23.346137+00', 141.828);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first published deal for entries added in the past 1 days', 469, '2022-04-14 23:52:23.347593+00', 141.828);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first published deal for entries added in the past 1 days', null, '2022-04-14 23:52:23.34858+00', 141.828);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_filecoin_aggregates', '{}', 'Count of aggregates created', 10559, '2022-04-15 00:17:01.506116+00', 0.019);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first active deal for entries added in the past 1 days', null, '2022-04-14 23:52:23.18895+00', 141.671);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first active deal for entries added in the past 1 days', 987, '2022-04-14 23:52:23.190566+00', 141.671);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first active deal for entries added in the past 7 days', 1444, '2022-04-14 23:57:55.577095+00', 473.88);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first active deal for entries added in the past 7 days', 1460, '2022-04-14 23:57:55.578821+00', 473.88);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_7day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first active deal for entries added in the past 7 days', 1746, '2022-04-14 23:57:55.58021+00', 473.88);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first published deal for entries added in the past 7 days', 720, '2022-04-14 23:57:55.641335+00', 474.092);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 635, '2022-04-14 23:57:55.758796+00', 474.199);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 184, '2022-04-14 23:57:55.759843+00', 474.199);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first published deal for entries added in the past 7 days', 1263, '2022-04-14 23:57:55.764552+00', 474.211);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first published deal for entries added in the past 7 days', 1025, '2022-04-14 23:57:55.765475+00', 474.211);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_7day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first published deal for entries added in the past 7 days', 1263, '2022-04-14 23:57:55.766745+00', 474.211);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 1192, '2022-04-14 23:57:55.803457+00', 474.243);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_7day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 7 days', 801, '2022-04-14 23:57:55.804664+00', 474.243);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_undealt_aggregates', '{{project,web3.storage}}', 'Count of aggregated items awaiting their first active deal per project', 14932, '2022-04-14 23:52:04.652388+00', 123.14);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first active deal for entries added in the past 1 days', 520, '2022-04-14 23:52:23.477401+00', 141.959);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first active deal for entries added in the past 1 days', 576, '2022-04-14 23:52:23.47871+00', 141.959);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated_deduplicated_eligible', '{{project,nft.storage}}', 'Amount of best-effort-deduplicated bytes pending initial aggregate inclusion per project', 15217412396, '2022-04-15 00:15:30.205214+00', 88.97);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated_deduplicated_eligible', '{{project,staging.web3.storage}}', 'Amount of best-effort-deduplicated bytes pending initial aggregate inclusion per project', 0, '2022-04-15 00:15:30.208459+00', 88.97);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated_deduplicated_eligible', '{{project,web3.storage}}', 'Amount of best-effort-deduplicated bytes pending initial aggregate inclusion per project', 46638011318, '2022-04-15 00:15:30.211281+00', 88.97);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_filecoin_aggregates_timebox_forced', '{}', 'Count of aggregates created by repackaging already stored DAGs in oder to satisfy timing and size constraints', 66, '2022-04-15 00:17:01.508901+00', 0.022);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_inactive', '{{project,web3.storage}}', 'Count of items exclusively from inactive sources', null, '2022-04-15 00:17:01.573405+00', 0.086);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_inactive', '{{project,nft.storage}}', 'Count of items exclusively from inactive sources', null, '2022-04-15 00:17:01.576363+00', 0.086);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_inactive', '{{project,staging.web3.storage}}', 'Count of items exclusively from inactive sources', null, '2022-04-15 00:17:01.577398+00', 0.086);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_oversized', '{{project,nft.storage}}', 'Count of items larger than a 32GiB sector not marked for deletion', 110, '2022-04-15 00:17:01.884676+00', 0.394);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active', '{{project,staging.web3.storage}}', 'Amount of known per-DAG-deduplicated bytes stored per project', 133740433155, '2022-04-15 00:18:08.902314+00', 67.415);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active', '{{project,web3.storage}}', 'Amount of known per-DAG-deduplicated bytes stored per project', 202952973268933, '2022-04-15 00:18:08.905081+00', 67.415);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active', '{{project,nft.storage}}', 'Amount of known per-DAG-deduplicated bytes stored per project', 174752075508915, '2022-04-15 00:18:08.908531+00', 67.415);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 1 days', 320, '2022-04-14 23:52:21.750239+00', 140.23);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_50pct', '{{project,nft.storage}}', '50 percentile minutes to first published deal for entries added in the past 1 days', 289, '2022-04-14 23:52:23.667894+00', 142.149);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first published deal for entries added in the past 1 days', null, '2022-04-14 23:52:23.668931+00', 142.149);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated', '{{project,staging.web3.storage}}', 'Amount of per-DAG-deduplicated bytes pending initial aggregate inclusion per project', 0, '2022-04-14 23:53:01.004039+00', 179.492);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated', '{{project,web3.storage}}', 'Amount of per-DAG-deduplicated bytes pending initial aggregate inclusion per project', 165775563953, '2022-04-14 23:53:01.005688+00', 179.492);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_unaggregated', '{{project,nft.storage}}', 'Amount of per-DAG-deduplicated bytes pending initial aggregate inclusion per project', 97767129549, '2022-04-14 23:53:01.006953+00', 179.492);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_in_active_deals', '{{project,web3.storage}}', 'Count of aggregated items with at least one active deal per project', 18384136, '2022-04-14 23:56:46.805243+00', 405.292);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_filecoin_deals', '{{status,active}}', 'Count of filecoin deals for aggregates packaged by the service', 39549, '2022-04-15 00:17:01.635396+00', 0.148);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_filecoin_deals', '{{status,published}}', 'Count of filecoin deals for aggregates packaged by the service', 188, '2022-04-15 00:17:01.637326+00', 0.148);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_filecoin_deals', '{{status,terminated}}', 'Count of filecoin deals for aggregates packaged by the service', 4450, '2022-04-15 00:17:01.638558+00', 0.148);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_handled_total_dags', '{}', 'How many user-named DAGs did the service handle since inception', 74231634, '2022-04-15 00:17:04.525385+00', 3.037);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_active', '{{project,staging.web3.storage}}', 'Count of non-deleted analyzed items stored per project', 1391, '2022-04-15 00:17:22.858427+00', 21.372);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_active', '{{project,web3.storage}}', 'Count of non-deleted analyzed items stored per project', 18372013, '2022-04-15 00:17:22.860829+00', 21.372);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_active', '{{project,nft.storage}}', 'Count of non-deleted analyzed items stored per project', 55110281, '2022-04-15 00:17:22.864074+00', 21.372);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_in_active_deals', '{{project,staging.web3.storage}}', 'Amount of per-DAG-deduplicated bytes with at least one active deal per project', 133753809372, '2022-04-14 23:51:45.76712+00', 104.256);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_in_active_deals', '{{project,web3.storage}}', 'Amount of per-DAG-deduplicated bytes with at least one active deal per project', 181663391277785, '2022-04-14 23:51:45.768323+00', 104.256);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_95pct', '{{project,nft.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 1 days', 412, '2022-04-14 23:52:21.747591+00', 140.23);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_aggregate_1day_95pct', '{{project,staging.web3.storage}}', '95 percentile minutes to first aggregate inclusion for entries added in the past 1 days', null, '2022-04-14 23:52:21.749096+00', 140.23);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_published_1day_50pct', '{{project,web3.storage}}', '50 percentile minutes to first published deal for entries added in the past 1 days', 200, '2022-04-14 23:52:23.666269+00', 142.149);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_with_uploads', '{{project,staging.web3.storage}}', 'Count of sources/users that have used the service to store some data', 57, '2022-04-15 00:17:01.773589+00', 0.287);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_with_uploads', '{{project,web3.storage}}', 'Count of sources/users that have used the service to store some data', 5636, '2022-04-15 00:17:01.775542+00', 0.287);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_with_uploads', '{{project,nft.storage}}', 'Count of sources/users that have used the service to store some data', 22321, '2022-04-15 00:17:01.776766+00', 0.287);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_without_uploads', '{{project,staging.web3.storage}}', 'Count of sources/users that have not yet stored a single DAG', 17, '2022-04-15 00:17:01.777993+00', 0.289);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_oversized', '{{project,staging.web3.storage}}', 'Count of items larger than a 32GiB sector not marked for deletion', 0, '2022-04-15 00:17:01.880988+00', 0.394);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_oversized', '{{project,web3.storage}}', 'Count of items larger than a 32GiB sector not marked for deletion', 130, '2022-04-15 00:17:01.88321+00', 0.394);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_deleted', '{{project,staging.web3.storage}}', 'Count of items marked deleted per project', 66, '2022-04-15 00:17:07.496304+00', 6.009);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_deleted', '{{project,web3.storage}}', 'Count of items marked deleted per project', 60281, '2022-04-15 00:17:07.498098+00', 6.009);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_deleted', '{{project,nft.storage}}', 'Count of items marked deleted per project', 1580402, '2022-04-15 00:17:07.499124+00', 6.009);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted', '{{project,staging.web3.storage}}', 'Amount of known per-DAG-deduplicated bytes retrieved and then marked deleted per project', 179128793, '2022-04-15 00:17:26.302201+00', 24.808);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted', '{{project,web3.storage}}', 'Amount of known per-DAG-deduplicated bytes retrieved and then marked deleted per project', 4216503036080, '2022-04-15 00:17:26.304389+00', 24.808);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted', '{{project,nft.storage}}', 'Amount of known per-DAG-deduplicated bytes retrieved and then marked deleted per project', 6364498229873, '2022-04-15 00:17:26.306054+00', 24.808);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted_deduplicated', '{{project,staging.web3.storage}}', 'Amount of known best-effort-deduplicated bytes retrieved and then marked deleted per project', 167281839, '2022-04-15 00:01:04.816754+00', 663.269);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted_deduplicated', '{{project,web3.storage}}', 'Amount of known best-effort-deduplicated bytes retrieved and then marked deleted per project', 3769806299850, '2022-04-15 00:01:04.817639+00', 663.269);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_deleted_deduplicated', '{{project,nft.storage}}', 'Amount of known best-effort-deduplicated bytes retrieved and then marked deleted per project', 4868823444847, '2022-04-15 00:01:04.818441+00', 663.269);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates_deduplicated', '{{project,staging.web3.storage}}', 'Best-effort-deduplicated bytes awaiting their first active deal per project', 0, '2022-04-14 21:42:49.028002+00', 3767.661);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates_deduplicated', '{{project,web3.storage}}', 'Best-effort-deduplicated bytes awaiting their first active deal per project', 465586944781, '2022-04-14 21:42:49.02984+00', 3767.661);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates_deduplicated', '{{project,nft.storage}}', 'Best-effort-deduplicated bytes awaiting their first active deal per project', 130637173069, '2022-04-14 21:42:49.031173+00', 3767.661);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_handled_total_bytes', '{}', 'How many best-effort-deduplicated bytes did the service handle since inception', 355129592516117, '2022-04-15 00:12:07.53776+00', 1326.028);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active_deduplicated', '{{project,staging.web3.storage}}', 'Amount of known best-effort-deduplicated bytes stored per project', 133120019698, '2022-04-15 00:06:49.972077+00', 1007.197);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active_deduplicated', '{{project,web3.storage}}', 'Amount of known best-effort-deduplicated bytes stored per project', 188433757365937, '2022-04-15 00:06:49.973392+00', 1007.197);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_active_deduplicated', '{{project,nft.storage}}', 'Amount of known best-effort-deduplicated bytes stored per project', 173151556056885, '2022-04-15 00:06:49.974805+00', 1007.197);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_handled_total_blocks', '{}', 'How many unique-by-cid blocks did the service handle since inception', 1147879581, '2022-04-14 21:38:17.75816+00', 3494.265);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_inactive_deduplicated', '{{project,staging.web3.storage}}', 'Amount of bytes in dags exclusively from inactive sources', null, '2022-04-14 23:50:01.652196+00', 0.139);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_inactive_deduplicated', '{{project,web3.storage}}', 'Amount of bytes in dags exclusively from inactive sources', null, '2022-04-14 23:50:01.654622+00', 0.139);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_bytes_inactive_deduplicated', '{{project,nft.storage}}', 'Amount of bytes in dags exclusively from inactive sources', null, '2022-04-14 23:50:01.656058+00', 0.139);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_95pct', '{{project,web3.storage}}', '95 percentile minutes to first active deal for entries added in the past 1 days', 813, '2022-04-14 23:52:23.189795+00', 141.671);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_item_minutes_to_deal_active_1day_50pct', '{{project,staging.web3.storage}}', '50 percentile minutes to first active deal for entries added in the past 1 days', null, '2022-04-14 23:52:23.476507+00', 141.959);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_without_uploads', '{{project,nft.storage}}', 'Count of sources/users that have not yet stored a single DAG', 9358, '2022-04-15 00:17:01.775895+00', 0.289);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_sources_total_without_uploads', '{{project,web3.storage}}', 'Count of sources/users that have not yet stored a single DAG', 3586, '2022-04-15 00:17:01.77905+00', 0.289);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_unaggregated', '{{project,web3.storage}}', 'Count of items pending initial aggregate inclusion per project', 4203, '2022-04-14 23:51:12.888341+00', 71.377);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_unaggregated', '{{project,nft.storage}}', 'Count of items pending initial aggregate inclusion per project', 21053, '2022-04-14 23:51:12.889497+00', 71.377);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_unaggregated', '{{project,staging.web3.storage}}', 'Count of items pending initial aggregate inclusion per project', 0, '2022-04-14 23:51:12.890402+00', 71.377);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_pending', '{{project,staging.web3.storage}}', 'Count of reported-pinned items pending retrieval from IPFS per project', 0, '2022-04-15 00:17:02.358061+00', 0.871);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_pending', '{{project,web3.storage}}', 'Count of reported-pinned items pending retrieval from IPFS per project', 0, '2022-04-15 00:17:02.360603+00', 0.871);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_stored_items_pending', '{{project,nft.storage}}', 'Count of reported-pinned items pending retrieval from IPFS per project', 0, '2022-04-15 00:17:02.361826+00', 0.871);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates', '{{project,nft.storage}}', 'Amount of per-DAG-deduplicated bytes awaiting their first active deal per project', 204892825645, '2022-04-14 23:53:27.248144+00', 205.736);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates', '{{project,staging.web3.storage}}', 'Amount of per-DAG-deduplicated bytes awaiting their first active deal per project', 0, '2022-04-14 23:53:27.24942+00', 205.736);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_bytes_undealt_aggregates', '{{project,web3.storage}}', 'Amount of per-DAG-deduplicated bytes awaiting their first active deal per project', 539078239772, '2022-04-14 23:53:27.250954+00', 205.736);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_undealt_aggregates', '{{project,staging.web3.storage}}', 'Count of aggregated items awaiting their first active deal per project', 0, '2022-04-14 23:52:04.651166+00', 123.14);

 INSERT INTO cargo.metrics (name, dimensions, description, value, collected_at, collection_took_seconds) VALUES
  ('dagcargo_project_items_undealt_aggregates', '{{project,nft.storage}}', 'Count of aggregated items awaiting their first active deal per project', 126908, '2022-04-14 23:52:04.653362+00', 123.14);

 