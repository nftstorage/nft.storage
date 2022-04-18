#!/usr/bin/env bash

env > .env
./scripts/constants-injection.sh &&
node ./dist/worker.js