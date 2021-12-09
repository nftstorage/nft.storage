-- Authenticator login
GRANT web_anon TO authenticator;
-- NFT.Storage user
GRANT nft_storage TO authenticator;
GRANT USAGE ON SCHEMA public TO nft_storage;
-- allow access to all tables/sequences/functions in the public schema currently
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO nft_storage;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO nft_storage;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO nft_storage;
-- allow access to new tables/sequences/functions that are created in the public schema in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO nft_storage;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO nft_storage;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO nft_storage;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE ON TABLES TO nft_storage;
-- RO for cargo schema
GRANT USAGE ON SCHEMA cargo TO nft_storage;
GRANT SELECT ON ALL TABLES IN SCHEMA cargo TO nft_storage;
ALTER DEFAULT PRIVILEGES IN SCHEMA cargo GRANT SELECT ON TABLES TO nft_storage;
