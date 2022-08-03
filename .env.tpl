# needs to be real so create a personal magic.link account or use the staging key
MAGIC_SECRET_KEY=secret

# Everything below this line can be left as-is for local development

# Wrangler overrides
DEBUG=true

# API Secrets
# the salt is literally secret, not a random string, just 'secret'
SALT=secret
MAILCHIMP_API_KEY=secret
METAPLEX_AUTH_TOKEN=metaplex-test-token

LOGTAIL_TOKEN=secret
# Dev private key for ucan auth
# You can use this one or create a new key with the ucan cli `ucan-storage keypair`
PRIVATE_KEY=xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY=

## API Sentry
SENTRY_DSN=https://000000@0000000.ingest.sentry.io/00000
SENTRY_TOKEN=secret
SENTRY_UPLOAD=false

## User request Slack notification webhook URL
SLACK_USER_REQUEST_WEBHOOK_URL=

## API PostgREST
DATABASE_URL=http://localhost:3000
DATABASE_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI

# Postgres Database
DATABASE_CONNECTION=postgresql://postgres:postgres@localhost:5432/postgres

# Cluster 
CLUSTER_BASIC_AUTH_TOKEN = dGVzdDp0ZXN0
CLUSTER_SERVICE = 
CLUSTER_API_URL = http://127.0.0.1:9094

# Maintenance Mode
MAINTENANCE_MODE = rw

# S3
S3_ENDPOINT = http://127.0.0.1:9000
S3_REGION = us-east-1
S3_ACCESS_KEY_ID = minioadmin
S3_SECRET_ACCESS_KEY = minioadmin
S3_BUCKET_NAME = dotstorage-dev-0
