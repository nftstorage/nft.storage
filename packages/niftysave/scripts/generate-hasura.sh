#!/usr/bin/env bash
echo "remove dir" &&
rm -rf ./gen/hasura &&
echo "run zeus" &&
npx zeus http://localhost:8080/v1/graphql ./gen/hasura --ts &&
echo "run typescript" &&
npx tsc ./gen/hasura/zeus/*.ts --moduleResolution node --target esnext --esModuleInterop --declaration &&
echo "remove some ts files" &&
rm ./gen/hasura/zeus/index.ts &&
rm ./gen/hasura/zeus/const.ts