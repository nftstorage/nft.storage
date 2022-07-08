# Changelog

## [3.5.0](https://github.com/nftstorage/nft.storage/compare/cron-v3.4.0...cron-v3.5.0) (2022-07-01)


### Features

* **cron:** nft-ttr logs store_duration_seconds to prometheus ([#2040](https://github.com/nftstorage/nft.storage/issues/2040)) ([d2889f4](https://github.com/nftstorage/nft.storage/commit/d2889f4a69de52482ce2c165c940171d74810fa6))

## [3.4.0](https://github.com/nftstorage/nft.storage/compare/cron-v3.3.0...cron-v3.4.0) (2022-06-27)


### Features

* **cron:** send instance=github_action label with retrieval_duration_seconds metric ([#2020](https://github.com/nftstorage/nft.storage/issues/2020)) ([5e95d27](https://github.com/nftstorage/nft.storage/commit/5e95d27c94f7253dac00db0591992b5502cdacc2))

## [3.3.0](https://github.com/nftstorage/nft.storage/compare/cron-v3.2.0...cron-v3.3.0) (2022-06-22)


### Features

* followup fixes for [#1945](https://github.com/nftstorage/nft.storage/issues/1945) after testing nft-ttr cron  ([#2000](https://github.com/nftstorage/nft.storage/issues/2000)) ([0765548](https://github.com/nftstorage/nft.storage/commit/0765548a4f46ebd2ccd1f5358e68686e766af1d8))

## [3.2.0](https://github.com/nftstorage/nft.storage/compare/cron-v3.1.0...cron-v3.2.0) (2022-06-16)


### Features

* create cron nft-ttr to measure nft time to retrievability ([#1945](https://github.com/nftstorage/nft.storage/issues/1945)) ([b8274f4](https://github.com/nftstorage/nft.storage/commit/b8274f467f5e85d569c2635e179e255c29c8b1af))

## [3.1.0](https://github.com/nftstorage/nft.storage/compare/cron-v3.0.0...cron-v3.1.0) (2022-06-08)


### Features

* add cargo metric statements and dummy data inserts for testing … ([#1835](https://github.com/nftstorage/nft.storage/issues/1835)) ([72480d6](https://github.com/nftstorage/nft.storage/commit/72480d6a9719308bf4a8a81c34764a51f5f58cfa))
* add done log line ([15436a6](https://github.com/nftstorage/nft.storage/commit/15436a6f9f740785d3462964c1b8ff449ccbb7f5))
* add stats routes ([#1400](https://github.com/nftstorage/nft.storage/issues/1400)) ([96acd59](https://github.com/nftstorage/nft.storage/commit/96acd592b8e0cc36f2adaf542ef4921cfa8bea22))
* cron update for cluster@1.0 ([#1807](https://github.com/nftstorage/nft.storage/issues/1807)) ([16e5333](https://github.com/nftstorage/nft.storage/commit/16e5333346d22c7c2d212ca0a80ff712fbc6ba2b))
* grace period for new pins found in error state ([#1577](https://github.com/nftstorage/nft.storage/issues/1577)) ([36050b3](https://github.com/nftstorage/nft.storage/commit/36050b3a8b52ad71348cca346a7dd3933b6f168f))
* track content bytes total metric ([#1199](https://github.com/nftstorage/nft.storage/issues/1199)) ([695e4a5](https://github.com/nftstorage/nft.storage/commit/695e4a5d7bbefc125291cfd001a743683efb6808))
* use Cluster statusAll method ([#1265](https://github.com/nftstorage/nft.storage/issues/1265)) ([c628259](https://github.com/nftstorage/nft.storage/commit/c628259179db7890335c476fffeff636b9fd0c26))


### Bug Fixes

* allow pool to exit when idle ([aeb3843](https://github.com/nftstorage/nft.storage/commit/aeb38439bc98f90877763d51e03ffe0247f236f3))
* column reference inserted_at is ambiguous ([3003926](https://github.com/nftstorage/nft.storage/commit/3003926c399be163fd09b3e4788699ac8f850f61))
* failed pins cron ([#1100](https://github.com/nftstorage/nft.storage/issues/1100)) ([eab0411](https://github.com/nftstorage/nft.storage/commit/eab0411b1215791469fa691edfb33d3b9ed398d1))
* metrics ([#1051](https://github.com/nftstorage/nft.storage/issues/1051)) ([cda9619](https://github.com/nftstorage/nft.storage/commit/cda9619d9dcdd26a449d20d78fec769d7ec20c28))
* metrics cron ([#1486](https://github.com/nftstorage/nft.storage/issues/1486)) ([8d27e91](https://github.com/nftstorage/nft.storage/commit/8d27e919b734194cdd459c4714fe96eec748a119))
* move to cluster3 ([#962](https://github.com/nftstorage/nft.storage/issues/962)) ([b6fc2c3](https://github.com/nftstorage/nft.storage/commit/b6fc2c3dfb1813f36f6a35e38c5f89fffb15e238))
* pins cron ([#1811](https://github.com/nftstorage/nft.storage/issues/1811)) ([f112573](https://github.com/nftstorage/nft.storage/commit/f1125738ba8e9c70a4a4da2cd8d3cbb48cb5b4c2))
* pool does not need connect ([1db831e](https://github.com/nftstorage/nft.storage/commit/1db831e0548c5996569a8dfc9884a6feabdf52c5))
* query cluster 3 for status ([#1099](https://github.com/nftstorage/nft.storage/issues/1099)) ([06a99f5](https://github.com/nftstorage/nft.storage/commit/06a99f512f461c75b90a41de09ef89cec6a85a84))
* revert using pool ([13e78f0](https://github.com/nftstorage/nft.storage/commit/13e78f0ee2ac9deff979da696ff3a481695eee22))
* update ipfs car and client ([#1373](https://github.com/nftstorage/nft.storage/issues/1373)) ([2b61549](https://github.com/nftstorage/nft.storage/commit/2b61549f4f31684a6afca28c9f7ed39dc076ada2))
* use pool ([8b8e817](https://github.com/nftstorage/nft.storage/commit/8b8e817379245b8cf2cfab135124d4636efbc6de))
* use source_cid in pin cron job ([#1757](https://github.com/nftstorage/nft.storage/issues/1757)) ([c49727c](https://github.com/nftstorage/nft.storage/commit/c49727c6159c37843f8b61957a6c97b2f1123637))
* value when metric is missing in db ([#1058](https://github.com/nftstorage/nft.storage/issues/1058)) ([e0f0490](https://github.com/nftstorage/nft.storage/commit/e0f049049efa4dc9d2bf2b9720cec119b917cb1c))


### Performance Improvements

* concurrent pin status sync ([#1104](https://github.com/nftstorage/nft.storage/issues/1104)) ([968b94a](https://github.com/nftstorage/nft.storage/commit/968b94a7977397804113d54b519afd1f1aaa03bd))
* metrics max concurrent queries and adds inserted at index to upload ([#1576](https://github.com/nftstorage/nft.storage/issues/1576)) ([4645d15](https://github.com/nftstorage/nft.storage/commit/4645d1594ec93eefee2d2d8f783b6ff5be5cfd8e))

## [2.1.0](https://www.github.com/nftstorage/nft.storage/compare/cron-v2.0.0...cron-v2.1.0) (2021-07-13)


### Features

* improvements to the setup ([#246](https://www.github.com/nftstorage/nft.storage/issues/246)) ([6a2501f](https://www.github.com/nftstorage/nft.storage/commit/6a2501f5c340af87c1571886961920280afec249))

## [2.0.0](https://www.github.com/nftstorage/nft.storage/compare/cron-v1.1.0...cron-v2.0.0) (2021-07-06)


### ⚠ BREAKING CHANGES

* add ipfs URL to gateway URL converter (#161)

### Features

* add ipfs URL to gateway URL converter ([#161](https://www.github.com/nftstorage/nft.storage/issues/161)) ([f115cd8](https://www.github.com/nftstorage/nft.storage/commit/f115cd8964bc565fc1a3313fc8d2fb3a392dd0ac))


### Bug Fixes

* chunking issues ([#203](https://www.github.com/nftstorage/nft.storage/issues/203)) ([d990a20](https://www.github.com/nftstorage/nft.storage/commit/d990a207fd99aa74bde56a5d6b79e5027cf42287))
* cluster status text for queued pin ([f0f9553](https://www.github.com/nftstorage/nft.storage/commit/f0f955305e9d65b6993f04a18b30673e5f8bc5e6))
* increase DAG size request timeout ([d833ab6](https://www.github.com/nftstorage/nft.storage/commit/d833ab631b865e9406b6434769d934f8c1bde946))

## [1.1.0](https://www.github.com/nftstorage/nft.storage/compare/cron-v1.0.1...cron-v1.1.0) (2021-05-26)


### Features

* add find-user tool ([45dcdc5](https://www.github.com/nftstorage/nft.storage/commit/45dcdc55b552d1b6ba8f3ba1db9f6a263fcf7e2f))
* cron job to ensure our pins are sent to Pinata ([#145](https://www.github.com/nftstorage/nft.storage/issues/145)) ([d071ca4](https://www.github.com/nftstorage/nft.storage/commit/d071ca4bb0921f9a663f8024a0e0e8a0fc7de0dd))


### Bug Fixes

* guard against null size ([52a97af](https://www.github.com/nftstorage/nft.storage/commit/52a97af6a2cf2be4b8dee1de946f05179b361358))
* increase retry timeout ([7ca6582](https://www.github.com/nftstorage/nft.storage/commit/7ca6582f0fd9ce07a59c7766fc3c907fe3d1fbf0))
* log line labels ([f4a1f89](https://www.github.com/nftstorage/nft.storage/commit/f4a1f890f4820aae92d2fcecd630ad972658e4c9))
* pin limiter to v2.0.1 ([107c946](https://www.github.com/nftstorage/nft.storage/commit/107c9462fc6f9118e8b390c6cbc18ef0bc55f18c))

### [1.0.1](https://www.github.com/nftstorage/nft.storage/compare/cron-v1.0.0...cron-v1.0.1) (2021-05-18)


### Reverts

* collection of followup metrics ([#133](https://www.github.com/nftstorage/nft.storage/issues/133)) ([b144224](https://www.github.com/nftstorage/nft.storage/commit/b144224ace1e67ba415206a6a3d9fcb071fbf878))

## 1.0.0 (2021-05-17)


### Features

* move metrics cron jobs to github actions ([#131](https://www.github.com/nftstorage/nft.storage/issues/131)) ([4ab3013](https://www.github.com/nftstorage/nft.storage/commit/4ab30134173764b82d1fb1887dafcb6e8f98ef9d))
