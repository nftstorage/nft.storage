DROP VIEW admin_search;

CREATE VIEW admin_search as
select
  u.id::text as user_id,
  u.email as email,
  u.github_id as github_id,
  ak.secret as token,
  ak.id::text as token_id,
  ak.deleted_at as deleted_at,
  akh.inserted_at as reason_inserted_at,
  akh.reason as reason,
  akh.status as status
from public.user u
full outer join auth_key ak on ak.user_id = u.id
full outer join (select * from auth_key_history where deleted_at is null) as akh on akh.auth_key_id = ak.id;
