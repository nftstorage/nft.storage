# HTTP API

## Raw HTTP Request
Configure your HTTP client and set the `Authorization` header:
```
"Authorization":"Bearer YOU_API_KEY"
```

Submit a `multipart/form-data` HTTP `POST` request to `https://api.nft.storage`

The request should contain a `file` property, the data for the file you want
to add.

The response is a JSON object. Check the [API Docs](https://nft.storage/api-docs) for information about the response.

Check out the [API Docs](https://nft.storage/api-docs) to find out how to query
the request to see IPFS pinning status and Filecoin deal state.


## HTTP API Docs

[Full API Docs](https://nft.storage/api-docs)