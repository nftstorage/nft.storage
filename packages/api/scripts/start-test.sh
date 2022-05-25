#!/usr/bin/env sh
# This script force builds docker images, src the env, kills the old containers, and starts the new containers.

# We're moving this script around a lot, and it's pretty cwd-dependent.
ENV_FILE=../../.env
docker compose --project-name="nft-storage-api-test" --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" build
docker compose --project-name="nft-storage-api-test" --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" down

docker compose --project-name="nft-storage-api-test" --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" run --rm playwright
test_exit_code=$?

docker compose --project-name="nft-storage-api-test" --profile="test" --file ./docker/docker-compose.yml --env-file="$ENV_FILE" down
exit "$test_exit_code"
