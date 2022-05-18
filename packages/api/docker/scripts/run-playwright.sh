#!/usr/bin/env bash

env > .env
./scripts/constants-injection.sh \
&& tsc \
&& ls test \
&& npx playwright-test 'test/**/*.spec.js' --sw dist/worker.js \
;
