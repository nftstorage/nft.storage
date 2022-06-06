DROP FUNCTION IF EXISTS create_upload;
DROP FUNCTION IF EXISTS find_deals_by_content_cids;
DROP FUNCTION IF EXISTS json_arr_to_text_arr;

DROP TYPE IF EXISTS upload_pin_type;

CREATE TYPE upload_pin_type AS
(
    status  pin_status_type,
    service service_type
);

-- transform a JSON array property into an array of SQL text elements
CREATE OR REPLACE FUNCTION json_arr_to_text_arr(_json json)
  RETURNS text[] LANGUAGE sql IMMUTABLE PARALLEL SAFE AS
  'SELECT ARRAY(SELECT json_array_elements_text(_json))';

CREATE OR REPLACE FUNCTION create_upload(data json) RETURNS void
    LANGUAGE plpgsql
    volatile
    PARALLEL UNSAFE
AS
$$
DECLARE
  inserted_upload_id BIGINT;
BEGIN
    SET LOCAL statement_timeout = '30s';
    insert into content (cid, dag_size, updated_at, inserted_at)
    values (data ->> 'content_cid',
            (data ->> 'dag_size')::BIGINT,
            (data ->> 'updated_at')::timestamptz,
            (data ->> 'inserted_at')::timestamptz)
    ON CONFLICT ( cid ) DO NOTHING;

    insert into pin (content_cid, status, service, updated_at, inserted_at)
    select data ->> 'content_cid',
           status,
           service,
           (data ->> 'updated_at')::timestamptz,
           (data ->> 'inserted_at')::timestamptz
    from json_populate_recordset(null::upload_pin_type, (data ->> 'pins')::json)
    on conflict (content_cid, service) do nothing;

    insert into upload as upld (user_id,
                        key_id,
                        content_cid,
                        source_cid,
                        mime_type,
                        type,
                        name,
                        files,
                        origins,
                        meta,
                        backup_urls,
                        updated_at,
                        inserted_at)
    values ((data ->> 'user_id')::BIGINT,
            (data ->> 'key_id')::BIGINT,
            data ->> 'content_cid',
            data ->> 'source_cid',
            data ->> 'mime_type',
            (data ->> 'type')::upload_type,
            data ->> 'name',
            (data ->> 'files')::jsonb,
            (data ->> 'origins')::jsonb,
            (data ->> 'meta')::jsonb,
            json_arr_to_text_arr(data -> 'backup_urls'),
            (data ->> 'updated_at')::timestamptz,
            (data ->> 'inserted_at')::timestamptz)
    ON CONFLICT ( user_id, source_cid )
        DO UPDATE SET deleted_at = null,
                      updated_at = (data ->> 'updated_at')::timestamptz,
                      name       = data ->> 'name',
                      meta       = (data ->> 'meta')::jsonb,
                      origins    = (data ->> 'origins')::jsonb,
                      mime_type  = data ->> 'mime_type',
                      type       = (data ->> 'type')::upload_type,
                      backup_urls = upld.backup_urls || json_arr_to_text_arr(data -> 'backup_urls')
    RETURNING id INTO inserted_upload_id;
END
$$;

CREATE OR REPLACE FUNCTION find_deals_by_content_cids(cids text[])
    RETURNS TABLE
            (
                status              text,
                "lastChanged"       timestamptz,
                "chainDealID"       bigint,
                "datamodelSelector" text,
                "statusText"        text,
                "dealActivation"    timestamptz,
                "dealExpiration"    timestamptz,
                miner               text,
                "pieceCid"          text,
                "batchRootCid"      text,
                "contentCid"        text
            )
    LANGUAGE sql
    STABLE
    PARALLEL SAFE
AS
$$
SELECT COALESCE(de.status, 'queued') as status,
       de.entry_last_updated         as lastChanged,
       de.deal_id                    as chainDealID,
       ae.datamodel_selector         as datamodelSelector,
       de.status_meta                as statusText,
       de.start_time                 as dealActivation,
       de.end_time                   as dealExpiration,
       de.provider                   as miner,
       a.piece_cid                   as pieceCid,
       ae.aggregate_cid              as batchRootCid,
       ae.cid_v1                     as contentCid
FROM cargo.aggregate_entries ae
         JOIN cargo.aggregates a USING (aggregate_cid)
         LEFT JOIN cargo.deals de USING (aggregate_cid)
WHERE ae.cid_v1 = ANY (cids)
ORDER BY de.entry_last_updated
$$;


-- Copies upload history from one user id to another.
-- If copy_tags is true, also copies all user tags from the old user account to the new one.
-- If copy_auth_keys is true, copies all API keys from the old account to the new one. 
--   The copied API keys will have the same name and secret, but will have new ids and will
--   have an independent "blocked" state and auth_key_history from the original user's auth keys.
CREATE OR REPLACE FUNCTION copy_user_data(old_user_id BIGINT, new_user_id BIGINT, copy_tags BOOLEAN, copy_auth_keys BOOLEAN) RETURNS void
  LANGUAGE plpgsql
  volatile
  PARALLEL UNSAFE
AS
$$
BEGIN

INSERT INTO upload (
  user_id,
  content_cid,
  source_cid, 
  mime_type, 
  type, 
  name, 
  files, 
  origins, 
  meta, 
  backup_urls, 
  updated_at, -- should probably use the current time instead
  inserted_at
)
SELECT  new_user_id, u.content_cid, u.source_cid, u.mime_type, u.type, u.name, u.files, u.origins, u.meta, u.backup_urls, u.updated_at, u.inserted_at
FROM upload as u
WHERE u.user_id = old_user_id;

IF copy_tags THEN
  INSERT INTO user_tag (
      user_id,
      tag,
      value,
      reason,
      inserted_at,
      deleted_at
  )
  SELECT new_user_id, t.tag, t.value, t.reason, t.inserted_at, t.deleted_at
  FROM user_tag as t
  WHERE t.user_id = old_user_id;
END IF;

IF copy_auth_keys THEN
    INSERT into auth_key (
        name,
        secret,
        user_id,
        inserted_at,
        updated_at,
        deleted_at
    )
    SELECT k.name, k.secret, new_user_id, k.inserted_at, k.updated_at, k.deleted_at
    FROM auth_key as k
    WHERE k.user_id = old_user_id;
END IF;

END
$$;