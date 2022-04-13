#!/usr/bin/env bash
cat ../../../.env && \
docker-compose down --remove-orphans && \
docker-compose build && \
# docker-compose run --env-file="../../../.env" --service-ports api
docker-compose --env-file="../../../.env" config && \
docker-compose --env-file="../../../.env" up 
