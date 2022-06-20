FROM mcr.microsoft.com/playwright:v1.20.0-focal

RUN npm i -g nodemon typescript
RUN mkdir -p /app

WORKDIR /app

# Make your docker builds 100x faster with this one trick :)
COPY ./package.json .
COPY  ./tsconfig.json .
RUN yarn install

COPY ./pw-test.config.cjs .
COPY ./docker/scripts ./docker-scripts
COPY ./scripts ./scripts
COPY ./db ./db
COPY ./src/ ./src
COPY ./test/ ./test

ENTRYPOINT ["./docker-scripts/run-playwright.sh" ]
