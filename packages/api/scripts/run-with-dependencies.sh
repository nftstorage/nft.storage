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
# - NFT_STORAGE_DEV_EXPOSE_PORTS: controls whether to expose service ports to the host.
#   accepted values:
#     - "none": don't expose anything
#     - "test": map service ports to the host ports defined in docker-compose.test-local-ports.yml
#     - default (any other value, including no value): expose the default service ports to the host, unless this script is being run from inside docker
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
}
trap cleanup EXIT

DIR_PATH=$(cd $(dirname "${BASH_SOURCE:-$0}") && pwd)
REPO_ROOT=$(realpath $DIR_PATH/../../..)

PERSIST_VOLUMES=${NFT_STORAGE_DEV_PERSIST_VOLUMES:-false}


EXPOSE_PORTS=true
PORT_EXPOSE_COMPOSE_FILE="$REPO_ROOT/docker/docker-compose.local-ports.yml"

if [ "$NFT_STORAGE_DEV_EXPOSE_PORTS" = "none" ]; then
  EXPOSE_PORTS=false
elif [ "$NFT_STORAGE_DEV_EXPOSE_PORTS" = "test" ]; then
  EXPOSE_PORTS=true
  PORT_EXPOSE_COMPOSE_FILE="$REPO_ROOT/docker/docker-compose.test-local-ports.yml"
  export DATABASE_URL=http://localhost:3001
  export CLUSTER_API_URL=http://localhost:9994
fi

COMPOSE_FILES="--file $REPO_ROOT/docker/docker-compose.yml"
if is_truthy $EXPOSE_PORTS; then
  COMPOSE_FILES="$COMPOSE_FILES --file $PORT_EXPOSE_COMPOSE_FILE"
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

if [ "$PERSIST_VOLUMES" != "false" ]; then
  COMPOSE_ARGS+=(
      "--renew-anon-volumes"
  )
fi

docker compose ${COMPOSE_ARGS[@]}

# execute the command passed into our arguments
$@

# cleanup() will be called whenever the invoked command exits
