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
  export NFT_STORAGE_DEV_EXPOSE_PORTS=none
fi


exec $DIR_PATH/run-with-dependencies.sh npx miniflare --watch --debug --env $ENV_FILE