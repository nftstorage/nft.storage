#!/usr/bin/env bash
npx esbuild \
  --define:PRIVATE_KEY='"xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY="' \
  --define:DATABASE_CONNECTION='"postgresql://postgres:postgres@db:5432/postgres"' \
  --define:DATABASE_TOKEN='"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI"' \
  --define:DATABASE_URL="'http://post_rest:3000'" \
  --define:LOGTAIL_TOKEN="'secret'" \
  --define:MAGIC_SECRET_KEY="'secret'" \
  --define:PRIVATE_KEY='"xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY="' \
  --define:SALT='"secret"' \
  --define:SENTRY_DSN='"https://000000@0000000.ingest.sentry.io/00000"' \
  --define:MAILCHIMP_API_KEY='"secret"' \
  --define:CLUSTER_API_URL='""' \
  --define:CLUSTER_BASIC_AUTH_TOKEN='""' \
  --define:DEBUG='false' \
  --platform=node \
  --target=node16 \
  src