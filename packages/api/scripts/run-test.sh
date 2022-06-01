#!/usr/bin/env bash

DIR_PATH=$(cd $(dirname "${BASH_SOURCE:-$0}") && pwd)
REPO_ROOT=$(realpath $DIR_PATH/../../..)
ENV_FILE=$REPO_ROOT/.env

die() {
    echo $1
    exit 1
}

is_in_devcontainer() {
    [ "$NFT_STORAGE_DEVCONTAINER" = "true" ]
}

cd $REPO_ROOT/packages/api
npx tsc || die "typescript error, aborting."

export NFT_STORAGE_DEV_PROJECT=nft-storage-test

if is_in_devcontainer; then
  export NFT_STORAGE_DEV_COMPOSE_OVERRIDE=test.container
else
  export NFT_STORAGE_DEV_COMPOSE_OVERRIDE=test.local
fi

exec $DIR_PATH/run-with-dependencies.sh  npx playwright-test "test/**/*.spec.js" --sw src/index.js
