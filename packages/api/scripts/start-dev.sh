#!/usr/bin/env bash
set -ex

cleanup() {
  docker compose --project-name "nft-storage-dev" down --remove-orphans
}
trap cleanup EXIT
npx miniflare dist/worker.js --watch --debug --env ../../.env
