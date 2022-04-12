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
# RUN "./scripts/cli.js db-sql --init"
#  ./scripts/cli.js db-sql --cargo --testing --reset"

#./node_modules/miniflare/dist/src/cli.js --watch --debug --binding PRIVATE_KEY=$PRIVATE_KEY --binding SALT="HI" --binding MAGIC_SECRET_KEY=abc --binding SENTRY_DSN="whatever" --binding DATABASE_TOKEN="hi there" --binding MAILCHIMP_API_KEY="hiiere" --binding LOGTAIL_TOKEN="wewewe"