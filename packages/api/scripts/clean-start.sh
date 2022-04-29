#!/usr/bin/env sh

# This script force builds docker images, src the env, kills the old containers, and starts the new containers.
cat ../../../.env && \
docker-compose down --remove-orphans && \
docker-compose build && \
# docker-compose run --env-file="../../../.env" --service-ports api
docker-compose --env-file="../../../.env" config && \
docker-compose --env-file="../../../.env" up
