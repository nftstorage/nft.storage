#!/usr/bin/env bash
./node_modules/miniflare/dist/src/cli.js --watch --debug \
  --binding PRIVATE_KEY=$PRIVATE_KEY \
  --binding SALT=$SALT \
  --binding MAGIC_SECRET_KEY=$MAGIC_SECRET_KEY \
  --binding SENTRY_DSN="whatever" \
  --binding DATABASE_TOKEN="hi there" \
  --binding MAILCHIMP_API_KEY="hiiere" \
  --binding LOGTAIL_TOKEN="wewewe"