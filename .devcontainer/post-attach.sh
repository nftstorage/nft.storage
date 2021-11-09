#!/usr/bin/env bash

# This script runs when attaching to the dev container in vscode. 

cd /workspace

yarn install

node packages/tools/cli.js local-env-check
