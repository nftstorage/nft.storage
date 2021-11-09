FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:16

# install psql client for poking at the db
RUN apt-get update && apt-get install -y postgresql-client

ENV DEV_USERNAME=

COPY .devcontainer/post-attach.sh /bin/

RUN mkdir /workspace && chown node /workspace
WORKDIR /workspace
USER node

# install wrangler cli globally
RUN npm install -g @cloudflare/wrangler

# prevent container from immediately exiting when run
CMD sleep infinity 
