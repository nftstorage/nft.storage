# Generate an API key at https://dashboard.heroku.com/account/applications
# Use your usual email address and API key for password.
heroku login --interactive

# PostgreSQL ###################################################################

# Create empty apps for staging and production
heroku apps:create nft-storage-staging --team=web3-storage
heroku apps:create nft-storage-prod --team=web3-storage

# Add PostgreSQL databases
heroku addons:create heroku-postgresql:premium-4 --app=nft-storage-pgrest-staging --name=nft-storage-staging-0
heroku addons:create heroku-postgresql:premium-4 --app=nft-storage-prod --name=nft-storage-prod-0

# Add replica
heroku addons:create heroku-postgresql:premium-4 --app=nft-storage-prod --name=nft-storage-replica-0 --follow $(heroku config:get DATABASE_URL --app=nft-storage-prod)

# Add schema
heroku pg:psql nft-storage-staging-0 --app=nft-storage-pgrest-staging
# ...run schema SQL from /packages/api/db/config.sql
# ...run schema SQL from /packages/api/db/tables.sql
# ...run schema SQL from /packages/api/db/fdw.sql with credentials replaced
# ...run schema SQL from /packages/api/db/cargo.sql
# ...run schema SQL from /packages/api/db/functions.sql
heroku pg:psql nft-storage-prod-0 --app=nft-storage-prod
# ...run schema SQL from /packages/api/db/config.sql
# ...run schema SQL from /packages/api/db/tables.sql
# ...run schema SQL from /packages/api/db/fdw.sql with credentials replaced
# ...run schema SQL from /packages/api/db/cargo.sql
# ...run schema SQL from /packages/api/db/functions.sql

# PostgREST ####################################################################

# Create PostgREST staging and production apps and connect them to staging/production DBs
# https://elements.heroku.com/buildpacks/postgrest/postgrest-heroku
# (App name has 30 char limit)
heroku apps:create nft-storage-pgrest-staging --buildpack https://github.com/hugomrdias/postgrest-heroku --team=web3-storage
heroku apps:create nft-storage-pgrest-prod --buildpack https://github.com/hugomrdias/postgrest-heroku --team=web3-storage
# heroku git:remote -a nft-storage-pgrest-staging

# Bump dyno sizes
heroku dyno:resize web=standard-1x --app nft-storage-pgrest-staging
heroku dyno:resize web=standard-2x --app nft-storage-pgrest-prod

# Create the web_anon, authenticator and nft_storage credentials
# (Heroku does not allow this to be done in the DB)
# Note that by default the created credential has NO PRIVILEGES
heroku pg:credentials:create nft-storage-staging-0 --name=web_anon --app=nft-storage-staging
heroku pg:credentials:create nft-storage-staging-0 --name=authenticator --app=nft-storage-staging
heroku pg:credentials:create nft-storage-staging-0 --name=nft_storage --app=nft-storage-staging

heroku pg:credentials:create nft-storage-prod-0 --name=web_anon --app=nft-storage-prod
heroku pg:credentials:create nft-storage-prod-0 --name=authenticator --app=nft-storage-prod
heroku pg:credentials:create nft-storage-prod-0 --name=nft_storage --app=nft-storage-prod

# Grant privileges to PostgREST DB users
# https://postgrest.org/en/stable/tutorials/tut0.html
# https://postgrest.org/en/stable/tutorials/tut1.html
heroku pg:psql nft-storage-staging-0 --app=nft-storage-staging < grant-postgrest.sql
heroku pg:psql nft-storage-prod-0 --app=nft-storage-prod < grant-postgrest.sql

# Attach databases to apps
heroku addons:attach nft-storage-prod-0 --app=nft-storage-pgrest-prod
heroku addons:attach nft-storage-replica-0 --app=nft-storage-pgrest-prod
heroku addons:attach nft-storage-staging-0 --app=nft-storage-pgrest-staging

# PGREST config vars
heroku config:set DB_ANON_ROLE=web_anon --app=nft-storage-pgrest-prod
heroku config:set DB_POOL=450 --app=nft-storage-pgrest-prod
heroku config:set DB_SCHEMA=public --app=nft-storage-pgrest-prod
heroku config:set JWT_SECRET=secret --app=nft-storage-pgrest-prod # Obtain secret from 1password vault!
heroku config:set POSTGREST_VER=9.0.0 --app=nft-storage-pgrest-prod

heroku config:set DB_ANON_ROLE=web_anon --app=nft-storage-pgrest-staging
heroku config:set DB_POOL=450 --app=nft-storage-pgrest-staging
heroku config:set DB_SCHEMA=public --app=nft-storage-pgrest-staging
heroku config:set JWT_SECRET=secret --app=nft-storage-pgrest-staging # Obtain secret from 1password vault!
heroku config:set POSTGREST_VER=9.0.0 --app=nft-storage-pgrest-staging

# Deploy
cd postgrest/
git init
git add -A
git commit -m "chore: configure postgrest"

heroku git:remote --app=nft-storage-pgrest-staging --remote staging
git push staging main
heroku git:remote --app=nft-storage-pgrest-prod
git push heroku main
# go back to heroku directory
cd ..

# Custom domains
heroku domains:add db-staging.nft.storage --app=nft-storage-pgrest-staging
heroku domains:add db.nft.storage --app=nft-storage-pgrest-prod
# DNS records need to be added to cloudflare with the returned DNS target

# SSL certs
heroku certs:auto:enable --app=nft-storage-pgrest-staging
heroku certs:auto:enable --app=nft-storage-pgrest-prod

# dagcargo #####################################################################

# Add dagcargo user
heroku pg:credentials:create nft-storage-staging-0 --name=dagcargo --app=nft-storage-staging
heroku pg:credentials:create nft-storage-prod-0 --name=dagcargo --app=nft-storage-prod

# Grant RO privileges to dagcargo user
heroku pg:psql nft-storage-staging-0 --app=nft-storage-staging < grant-dagcargo.sql
heroku pg:psql nft-storage-prod-0 --app=nft-storage-prod < grant-dagcargo.sql

# stats ########################################################################

# Add stats user for ad-hoc reporting (only needs production access)
heroku pg:credentials:create nft-storage-prod-0 --name=stats --app=nft-storage-prod

# Grant RO privileges to stats user
heroku pg:psql nft-storage-prod-0 --app=nft-storage-prod < grant-stats.sql
