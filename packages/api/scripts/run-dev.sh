#!/usr/bin/env bash

DIR_PATH=$(cd $(dirname "${BASH_SOURCE:-$0}") && pwd)
REPO_ROOT=$(realpath $DIR_PATH/../../..)
ENV_FILE=$REPO_ROOT/.env

if [ "$1" = "--persist" ]; then
  export NFT_STORAGE_DEV_PERSIST_VOLUMES=true
fi

is_running_in_docker() {
    cat /proc/1/cgroup | grep docker >/dev/null
}


if is_running_in_docker; then
  export NFT_STORAGE_DEV_COMPOSE_OVERRIDE=dev.container

  # miniflare will always use the values from the .env file, ignoring the local
  # environment, so we need to explicitly override the URLs for the services we
  # need using the --binding flag. 
  # The host-env.sh file will be sourced in run-with-dependencies.sh,
  # but we also need it here to make sure we set the correct urls.
  source "$REPO_ROOT/docker/compose-overrides/dev.container/host-env.sh"
  BINDINGS="--binding DATABASE_URL=$DATABASE_URL --binding CLUSTER_API_URL=$CLUSTER_API_URL"
else
  export NFT_STORAGE_DEV_COMPOSE_OVERRIDE=dev.local
  BINDINGS=""
fi

exec $DIR_PATH/run-with-dependencies.sh npx miniflare --watch --debug --env $ENV_FILE $BINDINGS