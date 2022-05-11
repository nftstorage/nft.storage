FROM mcr.microsoft.com/playwright:v1.21.0-focal

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

ENTRYPOINT ["yarn", "test" ]
