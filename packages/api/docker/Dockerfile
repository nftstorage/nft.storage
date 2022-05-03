FROM node:16-alpine3.12

# Intall missing dependencies
RUN apk add --update bash curl vim tmux postgresql-client
RUN npm i -g nodemon
# Create App dir
RUN mkdir -p /app

# Set working directory to App dir
WORKDIR /app

# Install dependencies in separate layer for speed.
COPY ./package.json .
RUN yarn install --verbose

COPY ./docker/scripts ./scripts
COPY ./db ./db
COPY ./src/ .

ENTRYPOINT ["nodemon", "--watch", "src/", "--exec", "'./scripts/run-miniflare.sh'" ]