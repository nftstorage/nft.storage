# Pinning Services API

IPFS is a distributed storage network. Data is cached on IPFS nodes, but may be cleared to make room for new content. A pinning service is a collection of IPFS nodes dedicated to saving data on the network so that it is not removed.

NFT.Storage provides a pinning service that is modeled closely on the IPFS Pinning Service API specification.

For a full list and documentation of all the available pinning service endpoints, visit the IPFS Pinning Service API endpoint documentation.

## Requesting access
To request access to the pinning service for your NFT.Storage account, you will need to request access from your API Key account page. Once approved, you will be able to access the pinning service API endpoints using your API token.

## Using the HTTP API
The NFT.Storage pinning service endpoint for all requests is https://api.nft.storage/pins.  For additional documentation, please see the IPFS Pinning Service API endpoint documentation.

### Add a pin
```javascript
curl -X POST 'https://api.nft.storage/pins' \
  --header 'Accept: */*' \
  --header 'Authorization: Bearer <YOUR_AUTH_KEY_JWT>' \
  --header 'Content-Type: application/json' \
  -d '{
  "cid": "QmCIDToBePinned",
  "name": "PreciousData.pdf",
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
The IPFS CLI can be used to maintain pins by first adding the NFT.Storage pinning service.

`ipfs pin remote service add nftstorage https://api.nft.storage/ <YOUR_AUTH_KEY_JWT>`

See more extensive documentation in the IPFS Docs.

### Add a pin
`ipfs pin remote add --service=nftstorage --name=<PIN-NAME> <CID>`

### List pins
`ipfs pin remote ls --service=nftstorage`

### Remove a pin
`ipfs pin remote rm --service=nftstorage --cid=<CID>`






