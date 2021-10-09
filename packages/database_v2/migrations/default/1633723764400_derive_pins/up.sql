-- Create pin records for all the content we have

INSERT INTO pin (content_cid, service, status)
  (SELECT cid as content_cid,
          'IpfsCluster2' as service,
          'PinQueued' as status
   FROM content) ON CONFLICT ON CONSTRAINT pin_content_cid_service_key DO
UPDATE
SET updated_at = EXCLUDED.updated_at;

