#!/usr/bin/env bash

THIS_DIR="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
API_DIR="$THIS_DIR/../.."

pushd $API_DIR

env > .env
tsc \
&& $THIS_DIR/constants-injection.sh \
&& npx playwright-test "./test/"'**/*.spec.js' --sw dist/worker.js \
;
popd
