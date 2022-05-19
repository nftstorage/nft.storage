#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
docker compose --file ./docker/docker-compose.yml --env-file="$ENV_FILE" --profile="test" up \
  --always-recreate-deps \
  --force-recreate \
  --remove-orphans \
  --renew-anon-volumes
  --build \
;
