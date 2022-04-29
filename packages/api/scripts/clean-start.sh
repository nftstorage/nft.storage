#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
COMPOSE_FILE=./docker/docker-compose.yml

cat $ENV_FILE && \
docker-compose -f $COMPOSE_FILE down --remove-orphans && \
docker-compose -f $COMPOSE_FILE build && \
docker-compose -f $COMPOSE_FILE --env-file="$ENV_FILE" config && \
docker-compose -f $COMPOSE_FILE --env-file="$ENV_FILE" up
