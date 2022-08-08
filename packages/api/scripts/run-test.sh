#!/usr/bin/env bash
set -eo pipefail

THIS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
CLI="$THIS_DIR/cli.js"

echo "initializing DB schema..."
$CLI db-sql --cargo --testing --reset
echo "creating minio bucket..."
$CLI minio bucket create dotstorage-dev-0

cd $THIS_DIR/..
echo "typechecking..."
npx tsc

echo "building worker..."
$CLI build --env=test

# run test suite, passing along any arguments we received
echo "running tests"
npx ava $@

