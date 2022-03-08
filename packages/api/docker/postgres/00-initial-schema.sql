

-- Set up reatime
create publication supabase_realtime for all tables;

-- Extension namespacing
create schema extensions;
create extension if not exists "uuid-ossp"      with schema extensions;
create extension if not exists pgcrypto         with schema extensions;
create extension if not exists pgjwt            with schema extensions;

-- Developer roles
create role anon                nologin noinherit;
create role authenticated       nologin noinherit; -- "logged in" user: web_user, app_user, etc
create role service_role        nologin noinherit bypassrls; -- allow developers to create JWT's that bypass their policies

create user authenticator noinherit;
grant anon              to authenticator;
grant authenticated     to authenticator;
grant service_role      to authenticator;


-- Create cargo schema
create schema if not exists cargo;

-- Grant privileges
grant usage                     on schema public, cargo to postgres, anon, authenticated, service_role;
alter default privileges in schema public, cargo grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public, cargo grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public, cargo grant all on sequences to postgres, anon, authenticated, service_role;

-- Create an event trigger function
CREATE OR REPLACE FUNCTION public.pgrst_watch() RETURNS event_trigger
  LANGUAGE plpgsql
  AS $$
BEGIN
  NOTIFY pgrst, 'reload schema';
END;
$$;

-- This event trigger will fire after every ddl_command_end event
CREATE EVENT TRIGGER pgrst_watch
  ON ddl_command_end
  EXECUTE PROCEDURE public.pgrst_watch();

