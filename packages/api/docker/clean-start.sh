#!/usr/bin/env bash
docker-compose down --remove-orphans && \
docker-compose build && \
docker-compose up
