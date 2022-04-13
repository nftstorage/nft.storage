#!/usr/bin/env bash

env > .env
./node_modules/miniflare/dist/src/cli.js --watch --debug