#!/usr/bin/env bash

tsc \
&& npx playwright-test 'test/**/*.spec.js' --sw src/index.js \
;
