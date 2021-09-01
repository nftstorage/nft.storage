drop function if exists upload;
drop type if exists upload_pin_type;

CREATE TYPE upload_pin_type AS (
  status pin_status_type,
  service service_type,
  error text
);

CREATE OR REPLACE FUNCTION upload(data json) 
RETURNS setof uploads
LANGUAGE plpgsql 
volatile
PARALLEL UNSAFE
AS $$

declare
  inserted_content contents%rowtype;
  inserted_upload uploads%rowtype;
  result upload_return_type;
BEGIN

insert into contents (cid, size)
  values (data->>'cid', (data->>'size')::int)
  ON CONFLICT ( cid ) DO NOTHING
  returning * into inserted_content;

insert into uploads ( issuer, key_id, cid, type, files )
  values (
    data->>'issuer', 
    (data->>'key_id')::int, 
    data->>'cid', 
    data->>'type',
    (data->>'files')::jsonb
  )
  ON CONFLICT ( issuer, cid ) DO NOTHING
  returning * into inserted_upload;


insert into pins (cid, status, service, error)
  select data->>'cid', status, service, error 
  from json_populate_recordset(null::upload_pin_type, (data->>'pins')::json)
  on conflict (cid, service) do nothing;

--raise exception 'upload % content % ', inserted_upload.id, inserted_content.cid;

return query select * 
from uploads u
where u.issuer = data->>'issuer' AND u.cid = data->>'cid';

IF NOT FOUND THEN
    RAISE EXCEPTION 'No upload found %', data->>'cid';
END IF;

RETURN;

END
$$;

