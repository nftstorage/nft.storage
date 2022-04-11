#
# Docker NodeJS Typescript Starter
# Example Dockerfile
#
FROM node:16-alpine3.12
# Intall missing dependencies
RUN apk add --update bash
# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Copy project files
COPY ./package.json .
RUN yarn install

COPY . .
# Install dependencies

RUN yarn install

# ENTRYPOINT "./scripts/cli.js db-sql --init"

ENTRYPOINT bash