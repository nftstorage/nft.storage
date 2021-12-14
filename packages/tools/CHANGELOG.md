# Changelog

## [1.3.0](https://www.github.com/nftstorage/nft.storage/compare/tools-v1.2.0...tools-v1.3.0) (2021-12-14)


### Features

* add opsgenie heartbeat to cron job ([#911](https://www.github.com/nftstorage/nft.storage/issues/911)) ([0f40e0e](https://www.github.com/nftstorage/nft.storage/commit/0f40e0edfbbc01406e9aa4952b18af8f420872a1))
* add prom metrics endpoint generated from postgres data ([#495](https://www.github.com/nftstorage/nft.storage/issues/495)) ([a99df3d](https://www.github.com/nftstorage/nft.storage/commit/a99df3ddc4f7f056a83758548992ed98e474b59a))
* db migration pipeline ([#491](https://www.github.com/nftstorage/nft.storage/issues/491)) ([56b8697](https://www.github.com/nftstorage/nft.storage/commit/56b8697c65b9f86d1bc76b4e7c3001cffd36b87e))
* migrate database to postgres  ([#263](https://www.github.com/nftstorage/nft.storage/issues/263)) ([ff0c919](https://www.github.com/nftstorage/nft.storage/commit/ff0c919ad63f8452357ff5f23b3f1ecd24880c86))
* remove kv code, update deps and improve client docs ([#714](https://www.github.com/nftstorage/nft.storage/issues/714)) ([22c4e50](https://www.github.com/nftstorage/nft.storage/commit/22c4e507c527d20d9a0587bee0380ea3471f45fe))


### Bug Fixes

* **api:** cluster auth by ipfs-cluster update ([#672](https://www.github.com/nftstorage/nft.storage/issues/672)) ([a49e785](https://www.github.com/nftstorage/nft.storage/commit/a49e7856a27a2b554e8056ccc578d79e42874083))
* car uploads from store endpoint ([#667](https://www.github.com/nftstorage/nft.storage/issues/667)) ([a65daca](https://www.github.com/nftstorage/nft.storage/commit/a65dacad083a9c68a3ba1b240277948251041164))
* db client usage in node.js and avoid duplicate cids ([#522](https://www.github.com/nftstorage/nft.storage/issues/522)) ([6d09ae7](https://www.github.com/nftstorage/nft.storage/commit/6d09ae73aa1c79ff1d03272a803f0cde9ad1a0de))
* increase website token ttl and update deps ([#943](https://www.github.com/nftstorage/nft.storage/issues/943)) ([35a3031](https://www.github.com/nftstorage/nft.storage/commit/35a303145c81e006820ee9cd7de6404bf7a9a86f))
* migrate existing user github data ([#541](https://www.github.com/nftstorage/nft.storage/issues/541)) ([c1dfc81](https://www.github.com/nftstorage/nft.storage/commit/c1dfc8133f7c18d7d8f307e7d71561ad3d598c6a))
* niftysave pin job failures by adopting request timeouts ([#267](https://www.github.com/nftstorage/nft.storage/issues/267)) ([0bac638](https://www.github.com/nftstorage/nft.storage/commit/0bac6385ef0417a7a3453172bf3a3ed9e664f9e6))
* update links to moved repo ([#650](https://www.github.com/nftstorage/nft.storage/issues/650)) ([df94aaa](https://www.github.com/nftstorage/nft.storage/commit/df94aaa8f1ec1a2e7d60a258a90758b2df630c9a))


### Changes

* fix website deploy ([936b6ec](https://www.github.com/nftstorage/nft.storage/commit/936b6ece8755c11c2e417e505714bd4c956b3013))
* improve cloudflare tools ([fa7b320](https://www.github.com/nftstorage/nft.storage/commit/fa7b32014fc6602151656c021effb33243acb003))
* prettier and LF line endings (no functional changes) ([#580](https://www.github.com/nftstorage/nft.storage/issues/580)) ([e1e5bc4](https://www.github.com/nftstorage/nft.storage/commit/e1e5bc47e5ae112a0775a25b275691a818665f37))
* remove fauna ([#564](https://www.github.com/nftstorage/nft.storage/issues/564)) ([55c8dcb](https://www.github.com/nftstorage/nft.storage/commit/55c8dcbe925582a6a8e05d1feb80f903c20250ec))
* update licences to dual mit and apache ([#909](https://www.github.com/nftstorage/nft.storage/issues/909)) ([307a8e2](https://www.github.com/nftstorage/nft.storage/commit/307a8e20526bef0f3ac516eb60fcd4fd82a0d65e))

## [1.2.0](https://www.github.com/nftstorage/nft.storage/compare/tools-v1.1.0...tools-v1.2.0) (2021-07-13)


### Features

* improvements to the setup ([#246](https://www.github.com/nftstorage/nft.storage/issues/246)) ([6a2501f](https://www.github.com/nftstorage/nft.storage/commit/6a2501f5c340af87c1571886961920280afec249))
* update pw-test so its easier to run sw tests ([#240](https://www.github.com/nftstorage/nft.storage/issues/240)) ([5737ffc](https://www.github.com/nftstorage/nft.storage/commit/5737ffcb0323e20b31fdabdd305da075b92a9047))

## [1.1.0](https://www.github.com/nftstorage/nft.storage/compare/tools-v1.0.2...tools-v1.1.0) (2021-07-07)


### Features

* cf sync pipeline ([#201](https://www.github.com/nftstorage/nft.storage/issues/201)) ([50a3b3f](https://www.github.com/nftstorage/nft.storage/commit/50a3b3f09ddb93cf10d4fb0cd3ccbd202156889a))

### [1.0.2](https://www.github.com/nftstorage/nft.storage/compare/tools-v1.0.1...tools-v1.0.2) (2021-05-14)


### Bug Fixes

* **tools:** dont filter by package ([6b04db3](https://www.github.com/nftstorage/nft.storage/commit/6b04db36f00e9ac18b2d479fa4db36032e087157))

### [1.0.1](https://www.github.com/nftstorage/nft.storage/compare/tools-v1.0.0...tools-v1.0.1) (2021-05-14)


### Bug Fixes

* **tools:** fix deploy-website command to use proper ref ([3350046](https://www.github.com/nftstorage/nft.storage/commit/3350046f7d302ba8e8967a4b2e6923cd508634bd))

## 1.0.0 (2021-05-14)


### Bug Fixes

* **tools:** fix cli exit codes ([16fa057](https://www.github.com/nftstorage/nft.storage/commit/16fa0574c8bd35553c6254b06ffdfd457f3b5474))
