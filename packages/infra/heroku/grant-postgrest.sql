-- Authenticator login
GRANT web_anon TO authenticator;
-- NFT.Storage user
GRANT nft_storage TO authenticator;
GRANT USAGE ON SCHEMA public TO nft_storage;
-- allow access to all tables in the public schema currently
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO nft_storage;
-- allow access to new tables that are created in the public schema in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO nft_storage;
