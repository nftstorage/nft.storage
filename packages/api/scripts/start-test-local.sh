#!/usr/bin/env bash
set -eX

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
COMPOSE_FILES="--file ./docker/docker-compose.yml --file ./docker/docker-compose.local-ports.yml"

docker compose \
  --project-name="nft-storage-api-local-tests" \
  $COMPOSE_FILES --env-file="$ENV_FILE" up \
  --detach \
  --always-recreate-deps \
  --remove-orphans \
  --force-recreate \
  --renew-anon-volumes \
  --build \
;

THIS_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
API_DIR="$THIS_DIR/../"

pushd $API_DIR

DATABASE_URL="http://localhost:3000"
CLUSTER_API_URL="http://localhost:9094"

tsc \
&& $API_DIR/docker/scripts/constants-injection.sh \
&& npx playwright-test "./test/"'**/*.spec.js' --sw dist/worker.js \
;

docker compose --project-name "nft-storage-api-local-tests" down --remove-orphans

popd
