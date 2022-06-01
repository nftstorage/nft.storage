#!/usr/bin/env bash

DIR_PATH=$(cd $(dirname "${BASH_SOURCE:-$0}") && pwd)
REPO_ROOT=$(realpath $DIR_PATH/../../..)
ENV_FILE=$REPO_ROOT/.env

die() {
    echo $1
    exit 1
}

is_running_in_docker() {
    cat /proc/1/cgroup | grep docker >/dev/null
}

cd $REPO_ROOT/packages/api
npx tsc || die "typescript error, aborting."

export NFT_STORAGE_DEV_PROJECT=nft-storage-test

if is_running_in_docker; then
  export NFT_STORAGE_DEV_EXPOSE_PORTS=none
  export NFT_STORAGE_DEV_DEVCONTAINER_NETWORK=true
  export NFT_STORAGE_DEV_DEVCONTAINER_TEST_HOSTNAMES=true
else
  export NFT_STORAGE_DEV_EXPOSE_PORTS=test
fi

exec $DIR_PATH/run-with-dependencies.sh  npx playwright-test "test/**/*.spec.js" --sw src/index.js
