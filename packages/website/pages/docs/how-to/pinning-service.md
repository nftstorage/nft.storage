# Pinning Services API

You can ask NFT.Storage to archive data that is already on the [IPFS](https://ipfs.io) distributed storage network with this API. This data will remain perpetually available over IPFS (backed by [Filecoin decentralized storage](https://nft.storage/docs/concepts/decentralized-storage/#filecoin-for-verifiable-content-persistence)).

NFT.Storage provides a pinning service that is modeled closely on the [IPFS Pinning Service API specification](https://ipfs.github.io/pinning-services-api-spec/).

For a full list and documentation of all the available pinning service endpoints, visit the [IPFS Pinning Service API endpoint documentation](https://ipfs.github.io/pinning-services-api-spec/#tag/pins).

## Requesting access
To request access to the pinning service for your NFT.Storage account, you will need to request access from your [API Key account page](https://nft.storage/manage/). Once approved, you will be able to access the pinning service API endpoints using your [API token](https://nft.storage/docs/#get-an-api-token).

## Using the HTTP API
The NFT.Storage pinning service endpoint for all requests is [https://api.nft.storage/pins](https://api.nft.storage/pins).  For additional documentation, please see the [IPFS Pinning Service API endpoint documentation](https://ipfs.github.io/pinning-services-api-spec/#tag/pins).

### Add a pin
```javascript
curl -X POST 'https://api.nft.storage/pins' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <YOUR_AUTH_KEY_JWT>' \
  --header 'Content-Type: application/json' \
  -d '{
  "cid": "QmCIDToBePinned",
  "name": "PreciousData.pdf"
}'
```

### List successful pins
```javascript
curl -X GET 'https://api.nft.storage/pins' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <YOUR_AUTH_KEY_JWT>'

Delete a pin
curl -X DELETE 'https://api.nft.storage/pins/<requestId>' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <YOUR_AUTH_KEY_JWT>'
```

## Using the IPFS CLI
The [IPFS CLI](https://docs.ipfs.io/reference/cli/) can be used to maintain pins by first adding the NFT.Storage pinning service.

`ipfs pin remote service add nftstorage https://api.nft.storage/ <YOUR_AUTH_KEY_JWT>`

See more extensive documentation in the [IPFS Docs](https://docs.ipfs.io/reference/cli/#ipfs-pin-remote).

### Add a pin
`ipfs pin remote add --service=nftstorage --name=<PIN-NAME> <CID>`

### List pins
`ipfs pin remote ls --service=nftstorage`

### Remove a pin
`ipfs pin remote rm --service=nftstorage --cid=<CID>`






