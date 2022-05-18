#!/usr/bin/env bash

env > .env
tsc \
&& ./scripts/constants-injection.sh \
&& npx playwright-test 'test/**/*.spec.js' --sw dist/worker.js \
;
