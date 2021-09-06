drop function if exists upload_fn;
drop type if exists upload_pin_type;

CREATE TYPE upload_pin_type AS (
  status pin_status_type,
  service service_type
);

CREATE OR REPLACE FUNCTION upload_fn(data json) RETURNS setof upload
  LANGUAGE plpgsql 
  volatile
  PARALLEL UNSAFE
AS 
$$
BEGIN

  insert into content (cid, dag_size)
    values (
      data->>'content_cid', 
      (data->>'dag_size')::bigint
    )
    ON CONFLICT ( cid ) DO NOTHING;

  insert into pin (content_cid, status, service)
    select data->>'content_cid', status, service
    from json_populate_recordset(null::upload_pin_type, (data->>'pins')::json)
    on conflict (content_cid, service) do nothing;

  insert into upload ( 
      account_id,
      key_id,
      content_cid,
      source_cid,
      mime_type,
      type,
      name,
      files, 
      origins, 
      meta
    ) values (
      (data->>'account_id')::bigint, 
      (data->>'key_id')::bigint, 
      data->>'content_cid',
      data->>'source_cid',
      data->>'mime_type',
      data->>'type'::upload_type,
      data->>'name',
      (data->>'files')::jsonb,
      (data->>'origins')::jsonb,
      (data->>'meta')::jsonb
    )
    ON CONFLICT ( account_id, content_cid ) DO NOTHING;



  --raise exception 'upload % content % ', inserted_upload.id, inserted_content.cid;

  return query select * 
  from upload u
  where u.account_id = data->>'account_id' AND u.content_cid = data->>'content_cid';

  IF NOT FOUND THEN
      RAISE EXCEPTION 'No upload found %', data->>'cid';
  END IF;

  RETURN;

END
$$;

