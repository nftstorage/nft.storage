FROM node:16-alpine3.12

HEALTHCHECK --interval=20s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8787/stats || exit 1

# Install some utilities to make life easier
RUN apk add --update bash curl vim tmux postgresql-client

RUN npm i -g nodemon
RUN mkdir -p /app

WORKDIR /app

# Make your docker builds 100x faster with this one trick :)
COPY ./package.json .
RUN yarn install

COPY  ./tsconfig.json .
COPY ./pw-test.config.cjs .
COPY ./docker/scripts ./scripts
COPY ./db ./db
COPY ./src/ ./src

ENTRYPOINT ["nodemon", "--watch", "src/", "--exec", "'./scripts/run-miniflare.sh'" ]
