#!/usr/bin/env bash

set -eo pipefail

# This script runs a command after first starting up all of our service dependencies
# (postgresql, post-rest, ipfs, ipfs-cluster).
# 
# all command line arguments are executed as-is. To configure the behavior of the script,
# set the following env variables:
#
# - NFT_STORAGE_DEV_PROJECT: docker compose project name. defaults to "nft-storage-dev"
#
# - NFT_STORAGE_DEV_COMPOSE_OVERRIDE:
#   accepted values:
#     - "dev.local": (default if var not set) expose database and cluster API ports to the host, using the default port numbers
#     - "test.local": expose database and cluster API on non-standard ports for testing, to avoid conflict with dev.local
#     - "dev.container": don't expose ports to the host, but do use the devcontainer docker network as the default so we can find the services by container name
#     - "test.container": like dev.container, but with "-test" appended to service container names (db-test, etc.) to avoid conflicts with dev.container
#
# - NFT_STORAGE_DEV_PERSIST_VOLUMES: if set to any value except "false" or "0", uses data volumes (db state, etc) from previous invocation and does not delete them on exit

is_truthy () {
  [ "$1" != "false" ] && [ "$1" != "0" ]
}

cleanup () {
    VOL_FLAG="-v"
    if is_truthy $PERSIST_VOLUMES; then
      VOL_FLAG=""
    fi
    docker compose --project-name=$COMPOSE_PROJECT down $VOL_FLAG
    echo "shutdown docker project $COMPOSE_PROJECT successfully"
}
trap cleanup EXIT

DIR_PATH=$(cd $(dirname "${BASH_SOURCE:-$0}") && pwd)
REPO_ROOT=$(realpath $DIR_PATH/../../..)
DOCKER_DIR="$REPO_ROOT/docker"

PERSIST_VOLUMES=${NFT_STORAGE_DEV_PERSIST_VOLUMES:-false}

COMPOSE_FILES="--file $DOCKER_DIR/docker-compose.yml"

COMPOSE_OVERRIDE=${NFT_STORAGE_DEV_COMPOSE_OVERRIDE:-dev.local}
COMPOSE_OVERRIDE_DIR="$DOCKER_DIR/compose-overrides/$COMPOSE_OVERRIDE"

if [[ ! -d "$COMPOSE_OVERRIDE_DIR" ]]; then
  echo "warning: ignoring invalid value for NFT_STORAGE_DEV_COMPOSE_OVERRIDE: $NFT_STORAGE_DEV_COMPOSE_OVERRIDE"
else
  COMPOSE_OVERRIDE_FILE="$COMPOSE_OVERRIDE_DIR/docker-compose.override.yml"
  if [[ -f "$COMPOSE_OVERRIDE_FILE" ]]; then
    COMPOSE_FILES="$COMPOSE_FILES --file $COMPOSE_OVERRIDE_FILE"
  else
    echo "error: docker compose override directory ${COMPOSE_OVERRIDE_DIR} exists, but does not contain required file docker-compose.override.yml"
    exit 1
  fi

  HOST_ENV_FILE="$COMPOSE_OVERRIDE_DIR/host-env.sh"
  if [[ -f "$HOST_ENV_FILE" ]]; then
    source $HOST_ENV_FILE
  fi
fi

COMPOSE_PROJECT=${NFT_STORAGE_DEV_PROJECT:-"nft-storage-dev"}

COMPOSE_ARGS=(
    "--project-name=$COMPOSE_PROJECT"
    $COMPOSE_FILES
    "up"
    "--detach"
    "--always-recreate-deps"
    "--remove-orphans"
    "--build"
)

if ! is_truthy $PERSIST_VOLUMES; then
  COMPOSE_ARGS+=(
      "--renew-anon-volumes"
  )
fi

docker compose ${COMPOSE_ARGS[@]}

# execute the command passed into our arguments
$@

# cleanup() will be called whenever the invoked command exits
