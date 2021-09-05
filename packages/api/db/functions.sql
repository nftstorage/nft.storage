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

  insert into content (cid, size)
    values (data->>'cid', (data->>'size')::int)
    ON CONFLICT ( cid ) DO NOTHING;

  insert into upload ( issuer, key_id, cid, type, files, name, origins, meta )
    values (
      data->>'issuer', 
      (data->>'key_id')::int, 
      data->>'cid', 
      data->>'type',
      (data->>'files')::jsonb,
      data->>'name',
      (data->>'origins')::jsonb,
      (data->>'meta')::jsonb
    )
    ON CONFLICT ( issuer, cid ) DO NOTHING;


  insert into pin (cid, status, service)
    select data->>'cid', status, service
    from json_populate_recordset(null::upload_pin_type, (data->>'pins')::json)
    on conflict (cid, service) do nothing;

  --raise exception 'upload % content % ', inserted_upload.id, inserted_content.cid;

  return query select * 
  from upload u
  where u.issuer = data->>'issuer' AND u.cid = data->>'cid';

  IF NOT FOUND THEN
      RAISE EXCEPTION 'No upload found %', data->>'cid';
  END IF;

  RETURN;

END
$$;

