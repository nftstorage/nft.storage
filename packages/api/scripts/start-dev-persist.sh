#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

REPO_ROOT=$(git rev-parse --show-toplevel)
ENV_FILE=$REPO_ROOT/.env
COMPOSE_DIR=$REPO_ROOT/docker

COMPOSE_FILES="--file $COMPOSE_DIR/docker-compose.yml --file $COMPOSE_DIR/docker-compose.dev.yml --file $COMPOSE_DIR/docker-compose.persist.yml"
docker compose \
  --project-name="nft-storage-api" \
  $COMPOSE_FILES --env-file="$ENV_FILE" up \
  --build \
  --remove-orphans \
;
