#!/usr/bin/env bash

env > .env
./scripts/constants-injection.sh && \
yarn run test:docker
