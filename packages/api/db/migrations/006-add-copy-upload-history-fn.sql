-- Copies upload history from one user id to another.
-- Copied uploads will be associated with new_auth_key, which 
-- should be the id of an auth_key belonging to the new user.
CREATE OR REPLACE FUNCTION copy_upload_history(old_user_id BIGINT, new_user_id BIGINT, new_auth_key_id BIGINT) RETURNS void
  LANGUAGE plpgsql
  volatile
  PARALLEL UNSAFE
AS
$$
BEGIN

INSERT INTO upload (
  user_id,
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
  inserted_at
)
SELECT  new_user_id, new_auth_key_id, u.content_cid, u.source_cid, u.mime_type, u.type, u.name, u.files, u.origins, u.meta, u.backup_urls, u.updated_at, u.inserted_at
FROM upload as u
WHERE u.user_id = old_user_id;

END
$$;