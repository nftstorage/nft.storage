#!/usr/bin/env bash

env > .env
./scripts/constants-injection.sh \
&& tsc \
&& yarn run test:docker \
;
