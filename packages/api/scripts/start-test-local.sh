#!/usr/bin/env bash
set -eX

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
COMPOSE_FILES="--file ./docker/docker-compose.yml --file ./docker/docker-compose.local-ports.yml"

cleanup() {
  docker compose --project-name "nft-storage-api-local-tests" down --remove-orphans
}
trap cleanup EXIT

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

export DATABASE_URL="http://localhost:3000"
export CLUSTER_API_URL="http://localhost:9094"

tsc \
&& npx playwright-test "./test/"'**/*.spec.js' --sw src/index.js \
;


popd
