# Changelog

## [2.1.0](https://www.github.com/ipfs-shipyard/nft.storage/compare/api-v2.0.0...api-v2.1.0) (2021-05-26)


### Features

* cron job to ensure our pins are sent to Pinata ([#145](https://www.github.com/ipfs-shipyard/nft.storage/issues/145)) ([d071ca4](https://www.github.com/ipfs-shipyard/nft.storage/commit/d071ca4bb0921f9a663f8024a0e0e8a0fc7de0dd))

## [2.0.0](https://www.github.com/ipfs-shipyard/nft.storage/compare/api-v1.1.0...api-v2.0.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* update cluster client for consistent hashes with IPFS

### Bug Fixes

* update cluster client for consistent hashes with IPFS ([5bc3c67](https://www.github.com/ipfs-shipyard/nft.storage/commit/5bc3c67b5310b54fd4fbc81bd313cccf21a68166))


### Reverts

* collection of followup metrics ([#133](https://www.github.com/ipfs-shipyard/nft.storage/issues/133)) ([b144224](https://www.github.com/ipfs-shipyard/nft.storage/commit/b144224ace1e67ba415206a6a3d9fcb071fbf878))

## [1.1.0](https://www.github.com/ipfs-shipyard/nft.storage/compare/api-v1.0.0...api-v1.1.0) (2021-05-17)


### Features

* **metrics:** collect and report total followups ([8d43e0f](https://www.github.com/ipfs-shipyard/nft.storage/commit/8d43e0fb6f4b6185df805330a4bd71d947e00586))
* move metrics cron jobs to github actions ([#131](https://www.github.com/ipfs-shipyard/nft.storage/issues/131)) ([4ab3013](https://www.github.com/ipfs-shipyard/nft.storage/commit/4ab30134173764b82d1fb1887dafcb6e8f98ef9d))


### Bug Fixes

* **metrics:** count followups not pins ([5e538d4](https://www.github.com/ipfs-shipyard/nft.storage/commit/5e538d4eb77d5a3c6793ce446ae311b737d7ab47))

## 1.0.0 (2021-05-14)


### Bug Fixes

* **api:** re-enable pinata in pin add ([ada4054](https://www.github.com/ipfs-shipyard/nft.storage/commit/ada405442be2e964f6149899869e266c2db41d60))
