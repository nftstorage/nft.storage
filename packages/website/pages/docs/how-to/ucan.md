# Use UCAN tokens for delegated authorization

When making requests to NFT.Storage using a [client library][client-js] or the [HTTP API][client-http], you must supply a "bearer token" to authenticate the request. This guide introduces **UCAN tokens**, which are a special kind of bearer token that can be used to issue tokens to other users.

Normally (without UCAN), when a user signs up for an account at NFT.Storage, the service will give them an API token to authenticate and authorize uploads. This is standard Web 2 auth, and it works great, but it has some limitations, especially if you want to use NFT.Storage to provide services for your own end users.

For example, if you're building an NFT marketplace and want users to upload art to NFT.Storage before minting, you can't put your API token into the source code for your web application without exposing it to the world. Since your API token includes more permissions than just uploading, like deleting uploads from your account, this isn't a great solution. You could work around this by running a proxy server that hides your token from your users and attaches it to storage requests, but this means you need to relay all traffic through your server and pay for bandwidth costs.

UCAN provides a way for the storage service to issue a special kind of authorization token called a UCAN token. UCAN tokens can be used to derive "child" UCAN tokens, which can have a subset of the permissions encoded in the "parent" UCAN.

## How it works

Since UCANs work differently than most authorization systems, it's worth taking a moment to understand the terms and concepts involved. If you want to jump in and start experimenting, head to [Using UCANs with NFT.Storage](#using-ucans-with-nft-storage) below.

[UCAN][ucan-intro] stands for User Controlled Authorization Networks, and it presents a new method of authorization that is a great fit for decentralized applications.

Participants in the UCAN auth flow are identified by a **keypair**, which is a **private signing key** with a corresponding **public verification key**. Each user or service involved in the flow will have their own keypair. The public key for each user or service is encoded into a [Decentralized Identity Document (DID)][did-overview], using the [did:key method][did-key], which encodes the public key into a compact string of the form `did:key:<encoded-public-key>`. These DID strings are used to identify each of the participants in the UCAN flow.

UCAN tokens are standard [JSON Web Tokens (JWTs)][jwt] with some additional properties that allow the kind of delegated chains of authority we've been describing. The [UCAN data structure][ucan-data-structure] specifies some required properties of the JWT payload, some of which, like `iss` and `aud` are standard fields in the JWT spec.

The `iss` or "issuer" field contains the public key that issued the token, encoded as a DID. The public key can be used to verify the token's signature, which must be created with the corresponding private signing key.

The `aud` or "audience" field contains the public key that should _receive_ the token.

The `nbf` or "not before" and `exp` or "expiry" fields contain [Unix timestamps][unix-ts] that can be used to control the time window during which the token should be considered valid.

The `prf` or "proof" field contains the "chain of proofs" that validates the delegated chain of authority.

The `att` or "attenuations" field specifies the permissions that the token should grant to the bearer. These are described in the [Storage capabilities](#storage-capabiliites) section below, and in greater detail in the [UCAN.Storage spec][ucan-storage-spec].

To illustrate the authorization flow, let's walk through an example of an NFT marketplace that wants to allow their users to upload to NFT.Storage.

First, the marketplace will generate a keypair and register their DID with the NFT.Storage service, then ask the service to issue them a **root token**. The root token is a UCAN token that encodes all the permissions that the marketplace account is allowed to perform. The `iss` field of the root token will be the DID for the NFT.Storage service, and the `aud` field will be the DID for the marketplace.

When an end-user logs into the marketplace and wants to upload to NFT.Storage, the marketplace can use their root token to create a **user token**. This time, the `iss` field contains the DID for the marketplace, since they are the one issuing the token, and the `aud` field contains the DID of the end user. The `prf` or "proof" field of the user token will contain a copy of the marketplace's root token, to verify that they actually have the permissions they're attempting to delegate. The root token is safe to share with the end-user, because it cannot be "redeemed" for storage services without the marketplace's private key.

When issuing the user token, the marketplace can choose to grant all the permissions that they have access to via the root token, or they can grant a subset of the permissions. The marketplace can also set an expiration time for the user tokens, so that a lost or compromised token will eventually expire. See [Storage capabilities](#storage-capabiliites) below for more about the permissions available.

Once a marketplace end-user has a user token, they'll create one last token, a **request token** that authorizes their upload request to the NFT.Storage service. The request token is generated _by the user_, most likely in the browser with JavaScript, and it must include a signature from their private key.

The request token has the end-user's DID in the `iss` field, with the DID for the NFT.Storage service in the `aud` field. The `prf` field contains a copy of the user token that was issued by the marketplace, which in turn has the root token in its own `prf` field.

The request token is attached to the upload to NFT.Storage, which validates the chain of proofs encoded in the token and confirms the cryptographic identity of each participant by checking the token signatures. If the token is valid and the permissions encoded in the request token are sufficient to carry out the request, it will succeed.

### Storage capabilities

UCAN tokens encode permissions as a set of "capabilities," which are objects describing actions that the token holder can perform upon some "resource."

NFT.Storage follows the [UCAN.Storage specification][ucan-storage-spec], which defines the `storage` capability. The `storage` capability represents access to operations over storage resources (e.g., uploading a file to NFT.Storage).

A capability object looks like this:

```json
{
  "with": "storage://did:key:<user-public-key>",
  "can": "upload/*"
}
```

The `with` field specifies the **resource pointer**, which in the case of UCAN.Storage is a string that includes the DID of the user to whom the token was issued. A `storage` resource pointer issued by a service that supports UCAN.Storage will always begin with the `storage://` prefix, followed by the DID that the token was issued to (the "audience" of the token).

When deriving child tokens for a new user, you will probably want to restrict that user's access to a sub-path of your storage. A simple way to do this is to append the DID of the new user to the resource path, with `/` characters separating the DID strings. For example, if your DID is `did:key:marketplace`, the token issued by the storage service would have the resource `storage://did:key:marketplace`. You can then issue a token to a user with the DID `did:key:user-1` and a resource path of `storage://did:key:marketplace/did:key:user-1`.

The `can` field specifies what **action** the token holder is authorized to perform. UCAN.Storage currently supports two actions, `upload/*` and `upload/IMPORT`.

The `upload/*` or "upload all" action allows access to all upload operations under the given resource.


See the [UCAN.Storage spec][ucan-storage-spec] for more details.

## Using UCANs with NFT.Storage

_Use of UCANs to delegate upload permissions in NFT.Storage is currently a Preview Feature. If you use and have any feedback, please leave feedback in [this Github Discussion](https://github.com/nftstorage/nft.storage/discussions/1591)!_

For marketplaces and other platforms, adopting UCAN auth can allow you to integrate free, decentralized NFT storage into your own applications without requiring your end users to sign up for an NFT.Storage account.

The NFT.Storage API includes endpoints for registering your DID with your NFT.Storage account and obtaining "root tokens" that can be used to delegate storage permissions to other users, whether they have an NFT.Storage account or not.

If you have not yet created an NFT.Storage account, see the [Quickstart guide][quickstart].

To use the UCAN API endpoints, create an API token at your NFT.Storage [account management page](https://nft.storage/manage/).

To manage the tokens themselves, you can use the [`ucan-storage` package][ucan-storage-github], which includes a JavaScript library and a command-line tool for creating and validating UCANs.

Below are the operations needed in order to start using UCAN tokens with NFT.Storage. Please note that some operations that are not specific to NFT.Storage (like generating keypairs and creating tokens) are described in the [`ucan-storage` documentation][ucan-storage-typedoc], so it's a good idea to click through the links below to understand the complete process.

### Registering your DID

Once you have a normal API token for NFT.Storage, you can [generate a keypair][ucan-storage-typedoc-generating-a-keypair] using the `ucan-storage` CLI and call an API endpoint to register the DID of the public key with the NFT.Storage service.

To register your DID, send a `POST` request to `https://api.nft.storage/user/did` with a body containing a JSON object of the form:

```json
{
  "did": "<your-did-string>"
}
```

In the example below, replace `$API_TOKEN` with your NFT.Storage API token, or set a shell variable named `API_TOKEN` before running the command.

Likewise, replace `$DID` with your DID string, or set a shell variable named `DID` before running the command.

```bash
curl -X POST -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' --data "{\"did\": \"$DID\"}" https://api.nft.storage/user/did
```

This should return a JSON object:

```json
{
  "ok": true,
  "value": "<the-did-you-registered>"}
```


### Obtaining a root UCAN token

Once you've registered your DID, you can request a root UCAN token from the NFT.Storage API, which will be valid for a duration of two weeks.

To request a root token, you must have either a normal API token or an existing root UCAN token. By providing an existing UCAN, you can "refresh" a token before it expires.

Send a `POST` request to `https://api.nft.storage/ucan/token` to obtain a new UCAN token.

In the example below, replace `$TOKEN` with either an existing UCAN token or an NFT.Storage API token. Or, set a shell variable named `TOKEN` before running the command.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" https://api.nft.storage/ucan/token
```

This will return a JSON object with the UCAN token in the `value` field:

```json
{
  "ok":true,
  "value":"eyJhb..."
}
```

You can use the root token to [derive child UCAN tokens][ucan-storage-typedoc-deriving-a-child-token] for other users, or to [create a request token][ucan-storage-typedoc-creating-a-request-token] to upload content using UCAN auth instead of your API token.

### Obtaining the service DID

The DID for the NFT.Storage service is available at the public endpoint `https://api.nft.storage/did`.

Send a `GET` request to `https://api.nft.storage/did`, which should return a JSON object of the form:

```json
{
  "ok": true,
  "value": "<service-did>"
}
```

The `value` field contains the service DID, which is used when [creating request tokens][ucan-storage-typedoc-creating-a-request-token].

## Sending requests

HTTP requests that use UCAN auth token must additionally set `x-agent-did` HTTP header to a DID that issued/signed the token.

## Getting help

Use of UCANs to delegate upload permissions in NFT.Storage is currently a Preview Feature. If you find issues with the integration, need help with tooling, or have suggestions for improving the API for your use cases, please leave feedback in [this Github Discussion](https://github.com/nftstorage/nft.storage/discussions/1591). We're excited to see what you'll build!

[quickstart]: /docs/
[concepts-decentralized-storage]: /docs/concepts/decentralized-storage

[client-js]: /docs/client/js
[client-http]: /docs/client/http

[multihash]: https://github.com/multiformats/multihash
[jwt]: https://jwt.io/
[ucan-intro]: https://ucan.xyz/
[ucan-data-structure]: https://ucan.xyz/#the-ucan-data-structure
[unix-ts]: https://www.unixtimestamp.com/

[ucan-storage-spec]: https://github.com/nftstorage/ucan.storage/blob/main/spec.md
[ucan-storage-github]: https://github.com/nftstorage/ucan.storage/
[ucan-storage-typedoc]: https://nftstorage.github.io/ucan.storage/
[ucan-storage-typedoc-use-cases]: https://nftstorage.github.io/ucan.storage/#use-cases
[ucan-storage-typedoc-generating-a-keypair]: https://nftstorage.github.io/ucan.storage/#generating-a-keypair
[ucan-storage-typedoc-deriving-a-child-token]: https://nftstorage.github.io/ucan.storage/#deriving-a-child-token
[ucan-storage-typedoc-creating-a-request-token]: https://nftstorage.github.io/ucan.storage/#creating-a-request-token-to-upload-content
