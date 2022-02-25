# Generates clients for various languages from the OpenAPI schema.
# Writes to ./out

# Ruby

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g ruby \
  --api-name-suffix=API \
  --git-user-id=nftstorage \
  --git-repo-id=ruby-client \
  --additional-properties=gemName=nft_storage \
  --additional-properties="gemSummary=A client library for the https://nft.storage/ service." \
  --additional-properties="gemDescription=A client library for the https://nft.storage/ service." \
  --additional-properties=moduleName=NFTStorage \
  -o /local/out/ruby-client

# Go

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g go \
  --api-name-suffix=API \
  --git-user-id=nftstorage \
  --git-repo-id=go-client \
  --additional-properties=packageName=nftstorage \
  -o /local/out/go-client

# Python

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g python \
  --api-name-suffix=API \
  --git-user-id=nftstorage \
  --git-repo-id=python-client \
  --additional-properties=projectName=nft.storage \
  --additional-properties=packageName=nft_storage \
  -o /local/out/python-client

# Rust

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g rust \
  --api-name-suffix=API \
  --git-user-id=nftstorage \
  --git-repo-id=rust-client \
  --additional-properties=packageName=nftstorage \
  -o /local/out/rust-client

# PHP

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g php \
  --api-name-suffix=API \
  --git-user-id=nftstorage \
  --git-repo-id=php-client \
  --additional-properties=packageName=NFTStorage \
  --additional-properties=invokerPackage=NFTStorage \
  -o /local/out/php-client

# Java

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/packages/website/public/schema.yml \
  -g java \
  --git-user-id=nftstorage \
  --git-repo-id=java-client \
  --additional-properties=invokerPackage=storage.nft \
  --additional-properties=apiPackage=storage.nft.api \
  --additional-properties=modelPackage=storage.nft.model \
  --additional-properties=groupId=nft.storage \
  --additional-properties=artifactId=nft.storage-client \
  --additional-properties="artifactDescription=A client library for the https://nft.storage/ service." \
  -o /local/out/java-client
