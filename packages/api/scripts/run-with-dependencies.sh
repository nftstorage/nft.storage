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
#     - default (any other value, including no value): expose the default service ports to the host
#
# - NFT_STORAGE_DEV_DEVCONTAINER_NETWORK: if set to any value except "false" or "0", sets the default network to the one used by the devcontainer.
# - NFT_STORAGE_DEV_DEVCONTAINER_TEST_HOSTNAMES: if set to any value except "false" or "0", overrides the default service hostnames inside the docker network
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

COMPOSE_FILES="--file $REPO_ROOT/docker/docker-compose.yml"

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

if is_truthy $EXPOSE_PORTS; then
  COMPOSE_FILES="$COMPOSE_FILES --file $PORT_EXPOSE_COMPOSE_FILE"
fi

if is_truthy ${NFT_STORAGE_DEV_DEVCONTAINER_NETWORK-:false}; then
  COMPOSE_FILES="$COMPOSE_FILES --file $REPO_ROOT/docker/docker-compose.devcontainer-network.yml"
fi

if is_truthy ${NFT_STORAGE_DEV_DEVCONTAINER_TEST_HOSTNAMES:-false}; then
  COMPOSE_FILES="$COMPOSE_FILES --file $REPO_ROOT/docker/docker-compose.test-container-names.yml"
  export DATABASE_URL=http://post-rest-test:3000
  export CLUSTER_API_URL=http://ipfs-cluster-test:9094
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
