#
# Docker NodeJS Typescript Starter
# Example Dockerfile
#
FROM node:16-alpine3.12

# Intall missing dependencies
RUN apk add --update bash curl

# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Install dependencies in separate layer for speed.
COPY ./package.json .
RUN yarn install

COPY . .

ENTRYPOINT ["./scripts/cli.js", "db-sql", "--cargo", "--testing"]