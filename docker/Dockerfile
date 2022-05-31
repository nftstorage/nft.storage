FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16

RUN npm i -g nodemon 
RUN mkdir -p /nft.storage
RUN mkdir -p /root/.cache/ms-playwright

WORKDIR /nft.storage

COPY ./package.json .
COPY ./yarn.lock .
COPY ./packages ./packages
RUN yarn install

CMD [ "/bin/sh", "-c", "'while true; do sleep 1000; done'" ]