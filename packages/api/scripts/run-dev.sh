#!/usr/bin/env bash
set -eo pipefail

THIS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
CLI="$THIS_DIR/cli.js"

echo "starting dev environment"

function fail_unless_persistent_mode {
  local status=$?
  local what=$1
  if [[ "$PERSIST_VOLUMES" != "" ]]; then
    echo "⚠️ $what failed with status $status - ignored because you're running with persistent data volumes"
  else
    echo "🧨 $what failed with status $status"
    exit $status
  fi
}

# reset schema by default, unless we're in persistent mode
SCHEMA_RESET="--reset"
if [[ "$PERSIST_VOLUMES" != "" ]]; then
  SCHEMA_RESET=""
fi

echo "initializing DB schema..."
$CLI db-sql --cargo --testing $SCHEMA_RESET || fail_unless_persistent_mode "db schema init" 
echo "creating minio bucket"
$CLI minio bucket create dotstorage-dev-0 || fail_unless_persistent_mode "minio bucket creation" 

echo "starting miniflare..."
cd $THIS_DIR/..
npx miniflare dist/worker.js --watch --debug --env ../../.env
