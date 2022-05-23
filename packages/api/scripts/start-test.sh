#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

REPO_ROOT=$(git rev-parse --show-toplevel)
ENV_FILE=$REPO_ROOT/.env
COMPOSE_DIR=$REPO_ROOT/docker

docker compose --profile="test" --file $COMPOSE_DIR/docker-compose.yml --env-file="$ENV_FILE" config

docker compose \
  --project-name="nft-storage-api-test" \
  --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" up \
  --always-recreate-deps \
  --force-recreate \
  --renew-anon-volumes \
  --build \
  --exit-code-from "playwright" \
  --attach "playwright" \
  --no-log-prefix \
;
