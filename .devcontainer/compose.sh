#!/usr/bin/env bash

# make sure we're running from the .devcontainer dir, even if invoked from elsewhere
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

docker-compose -f docker-compose.yml -f docker-compose.db.yml -f docker-compose.extend.yml "$@"
