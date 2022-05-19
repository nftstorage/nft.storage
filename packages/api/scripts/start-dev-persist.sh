#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
COMPOSE_FILES="-f ./docker/docker-compose.yml -f ./docker/docker-compose.persist.yml"

cat $ENV_FILE && \
docker compose $COMPOSE_FILES down --remove-orphans && \
docker compose $COMPOSE_FILES build && \
docker compose $COMPOSE_FILES --env-file="$ENV_FILE" config && \
docker compose $COMPOSE_FILES --env-file="$ENV_FILE" up
