DROP TYPE IF EXISTS upload_type cascade;
DROP TYPE IF EXISTS pin_status_type cascade;
DROP TYPE IF EXISTS service_type cascade;
DROP TYPE IF EXISTS auth_key_blocked_status_type cascade;
DROP TYPE IF EXISTS user_tag_type cascade;
DROP TYPE IF EXISTS user_tag_value_type cascade;
DROP TABLE IF EXISTS upload CASCADE;
DROP TABLE IF EXISTS pin;
DROP TABLE IF EXISTS content;
DROP TABLE IF EXISTS auth_key_history;
DROP TABLE IF EXISTS auth_key;
DROP TABLE IF EXISTS public.user_tag;
DROP TABLE IF EXISTS public.user;

DROP TABLE IF EXISTS cargo.aggregate_entries;
DROP TABLE IF EXISTS cargo.aggregates;
DROP TABLE IF EXISTS cargo.deals;
DROP SERVER IF EXISTS dag_cargo_server CASCADE;