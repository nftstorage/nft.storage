#!/usr/bin/env bash

env

npx miniflare --debug \
  --build-command "npm run build" \
  --binding ENV="$ENV" \
  --binding PRIVATE_KEY="$PRIVATE_KEY" \
  --binding DATABASE_CONNECTION="$DATABASE_CONNECTION" \
  --binding DATABASE_TOKEN="$DATABASE_TOKEN" \
  --binding DATABASE_URL="$DATABASE_URL" \
  --binding LOGTAIL_TOKEN="$LOGTAIL_TOKEN" \
  --binding MAGIC_SECRET_KEY="$MAGIC_SECRET_KEY" \
  --binding SALT="$SALT" \
  --binding SENTRY_DSN="$SENTRY_DSN" \
  --binding MAILCHIMP_API_KEY="$MAILCHIMP_API_KEY" \
  --binding CLUSTER_API_URL="$CLUSTER_API_URL" \
  --binding CLUSTER_BASIC_AUTH_TOKEN="$CLUSTER_BASIC_AUTH_TOKEN" \
  --binding DEBUG="$DEBUG" \
  --binding NFT_STORAGE_VERSION="$NFT_STORAGE_VERSION" \
  --binding NFT_STORAGE_COMMITHASH="$NFT_STORAGE_COMMITHASH" \
  --binding NFT_STORAGE_BRANCH="$NFT_STORAGE_BRANCH" \
  --binding METAPLEX_AUTH_TOKEN="$METAPLEX_AUTH_TOKEN" \
  --binding S3_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
  --binding S3_BUCKET_NAME="$S3_BUCKET_NAME" \
  --binding S3_ENDPOINT="$S3_ENDPOINT" \
  --binding S3_REGION="$S3_REGION" \
  --binding S3_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
;
  