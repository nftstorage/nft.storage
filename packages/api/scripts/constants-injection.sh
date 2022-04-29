#!/usr/bin/env sh


# Introduced these variables mostly to debug the env templating in a container vs the host.

# Variables for use in docker.
ESBUILD_CMD="node_modules/esbuild/bin/esbuild"
ENTRYPOINT="./src/index.js"
OUT_DIR="/app/dist"

# variables for use in the host for debugging, etc.
ESBUILD_CMD="npx esbuild"
ENTRYPOINT="./src/constants.js"
OUT_DIR="./tmp"

# End host debug section

mkdir -p $OUT_DIR && \
$ESBUILD_CMD \
  --bundle \
  --sourcemap \
  --define:PRIVATE_KEY="'xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY='" \
  --define:DATABASE_CONNECTION="\"$DATABASE_CONNECTION\"" \
  --define:DATABASE_TOKEN="\"$DATABASE_TOKEN\"" \
  --define:DATABASE_URL="\"$DATABASE_URL\"" \
  --define:LOGTAIL_TOKEN="\"$LOGTAIL_TOKEN\"" \
  --define:MAGIC_SECRET_KEY="\"$MAGIC_SECRET_KEY\"" \
  --define:SALT="\"$SALT\"" \
  --define:SENTRY_DSN="\"$SENTRY_DSN\"" \
  --define:MAILCHIMP_API_KEY="\"$MAILCHIMP_API_KEY\"" \
  --define:CLUSTER_API_URL="\"$CLUSTER_API_URL\"" \
  --define:CLUSTER_BASIC_AUTH_TOKEN="\"$CLUSTER_BASIC_AUTH_TOKEN\"" \
  --define:DEBUG='true' \
  --define:VERSION="'development'" \
  --define:COMMITHASH="'development'" \
  --define:BRANCH="'development'" \
 $ENTRYPOINT > $OUT_DIR/worker.js