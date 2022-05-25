#!/usr/bin/env sh

ENV_FILE=../../.env
docker compose --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" config

docker compose \
  --project-name="nft-storage-api-test" \
  --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" up \
  --always-recreate-deps \
  --force-recreate \
  --renew-anon-volumes \
  --build \
  --attach "playwright" \
  ;

