# OpenAPI generated clients

If you're integrating NFT.Storage with a JavaScript project, the [JavaScript client][reference-js-client] is a natural fit. If JavaScript isn't part of your stack, the NFT.Storage [HTTP API][reference-http-api] can be used from any programming language capable of making HTTP requests. 

In addition to using the standard request libraries for your language, you can use client libraries generated from the [OpenAPI](https://www.openapis.org/) schema that describes the API.

Please note that the generated clients are limited to uploads of 100 Mib per request. It's possible to recreate the behavior of the [JavaScript client][reference-js-client] and upload files of up to 31 Gib by first encoding your data into a Content Archive (CAR) and splitting the CAR into chunks of less than 100 Mib. Once all of the CAR chunks are uploaded, the complete file will be available for retrieval. See the [guide to CAR files][concepts-car] for more details on creating and splitting CARs.

Generated clients are available for the following languages:

- [Go](https://github.com/nftstorage/go-client)
- [Java](https://github.com/nftstorage/java-client)
- [PHP](https://github.com/nftstorage/php-client)
- [Python](https://github.com/nftstorage/python-client)
- [Ruby](https://github.com/nftstorage/ruby-client)
- [Rust](https://github.com/nftstorage/rust-client)

Please see the repository for each client library for usage details.

[concepts-car]: /docs/concepts/car-files
[reference-http-api]: /api-docs/
[reference-js-client]: /docs/client/js/