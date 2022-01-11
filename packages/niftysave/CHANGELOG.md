# Changelog

## [1.1.0](https://www.github.com/nftstorage/nft.storage/compare/niftysave-v1.0.0...niftysave-v1.1.0) (2022-01-11)


### Features

* add exponentian backoff to mitigate ratelimits  ([#462](https://www.github.com/nftstorage/nft.storage/issues/462)) ([94ba93c](https://www.github.com/nftstorage/nft.storage/commit/94ba93cf72da35e323e363d793c0cf9d1d19d9db))
* add marketplace logos ([#840](https://www.github.com/nftstorage/nft.storage/issues/840)) ([f02ee96](https://www.github.com/nftstorage/nft.storage/commit/f02ee9648bbb284399b00c0d11e3445166b95bbf))
* adds constraints to handle edge cases in migration scripts ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* adds docker images for postgres and hasura ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* adds sql provision script in the database_v2 package ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* enable niftysave ([#256](https://www.github.com/nftstorage/nft.storage/issues/256)) ([b93614e](https://www.github.com/nftstorage/nft.storage/commit/b93614ece6806611addea215726ff43f5f7f98bc))
* generalized migration script, and independent migrations per-entity ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* niftysave abstraction for uri_hash ([#482](https://www.github.com/nftstorage/nft.storage/issues/482)) ([8ef4965](https://www.github.com/nftstorage/nft.storage/commit/8ef4965b00696f03f92958fd3eec829f00e6b702))
* niftysave nft parsed state & foreign keys ([#629](https://www.github.com/nftstorage/nft.storage/issues/629)) ([66d2f49](https://www.github.com/nftstorage/nft.storage/commit/66d2f491e7b5a0e8c59fb2d1cf978e11cd289d6c))
* niftysave postgres migration ([#442](https://www.github.com/nftstorage/nft.storage/issues/442)) ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* remove custom multipart parser ([#336](https://www.github.com/nftstorage/nft.storage/issues/336)) ([029e71a](https://www.github.com/nftstorage/nft.storage/commit/029e71aefc1b152a080ffb5739e4f7c2565a1e57))
* remove kv code, update deps and improve client docs ([#714](https://www.github.com/nftstorage/nft.storage/issues/714)) ([22c4e50](https://www.github.com/nftstorage/nft.storage/commit/22c4e507c527d20d9a0587bee0380ea3471f45fe))
* rewire niftysave analyzer ([#517](https://www.github.com/nftstorage/nft.storage/issues/517)) ([b6b908d](https://www.github.com/nftstorage/nft.storage/commit/b6b908d80acb5bb18efa9e6bbea445b3bb30e1a4))
* rewire niftysave pinner to new backend ([#553](https://www.github.com/nftstorage/nft.storage/issues/553)) ([c7e9f9e](https://www.github.com/nftstorage/nft.storage/commit/c7e9f9e9778114b46a8d039130e06e9dbf5e8062))
* seo optimization ([#765](https://www.github.com/nftstorage/nft.storage/issues/765)) ([d4a650c](https://www.github.com/nftstorage/nft.storage/commit/d4a650c7e8794504f697684018f3849c98357923))
* table provisioning script via hasura migrations ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))


### Bug Fixes

* add inserted at on bins ([#700](https://www.github.com/nftstorage/nft.storage/issues/700)) ([e5531af](https://www.github.com/nftstorage/nft.storage/commit/e5531af8afc7d414351d046d860de5c8352aee34))
* add undeclared niftysave dependencies ([#585](https://www.github.com/nftstorage/nft.storage/issues/585)) ([5f16872](https://www.github.com/nftstorage/nft.storage/commit/5f1687204c46f68cf70df185671771e490e5e63b))
* add yargs to the dependencies so it runs in prod ([#699](https://www.github.com/nftstorage/nft.storage/issues/699)) ([4bfe41d](https://www.github.com/nftstorage/nft.storage/commit/4bfe41d5c2efe5e6356c4072b624b17742b44ddb))
* analyzer by switching from index to collections ([d581d9e](https://www.github.com/nftstorage/nft.storage/commit/d581d9e410769342f7cb40808b414888207d07c3))
* **api:** cluster auth by ipfs-cluster update ([#672](https://www.github.com/nftstorage/nft.storage/issues/672)) ([a49e785](https://www.github.com/nftstorage/nft.storage/commit/a49e7856a27a2b554e8056ccc578d79e42874083))
* car uploads from store endpoint ([#667](https://www.github.com/nftstorage/nft.storage/issues/667)) ([a65daca](https://www.github.com/nftstorage/nft.storage/commit/a65dacad083a9c68a3ba1b240277948251041164))
* close reader on uncaught exception; logging as well ([#590](https://www.github.com/nftstorage/nft.storage/issues/590)) ([c62b083](https://www.github.com/nftstorage/nft.storage/commit/c62b083ad07029dbad8d072c7c78cbfd4097db3f))
* erc721-import migration ([#501](https://www.github.com/nftstorage/nft.storage/issues/501)) ([ae6cb99](https://www.github.com/nftstorage/nft.storage/commit/ae6cb995b7356f60696b47e05a847b05f1a3739a))
* failing dep installs ([#530](https://www.github.com/nftstorage/nft.storage/issues/530)) ([1da2c45](https://www.github.com/nftstorage/nft.storage/commit/1da2c455f3fe1d3278c252dc47921b43789df68c))
* implement schema changes to match nft.storage tables ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* metrics ([#1051](https://www.github.com/nftstorage/nft.storage/issues/1051)) ([cda9619](https://www.github.com/nftstorage/nft.storage/commit/cda9619d9dcdd26a449d20d78fec769d7ec20c28))
* nft-asset migration ([#499](https://www.github.com/nftstorage/nft.storage/issues/499)) ([8692432](https://www.github.com/nftstorage/nft.storage/commit/86924324c8215eef3a8799d1c1d740a6a919acd1))
* niftysave duplicate erc721 import migration ([#502](https://www.github.com/nftstorage/nft.storage/issues/502)) ([4a2e22c](https://www.github.com/nftstorage/nft.storage/commit/4a2e22ca7f7528c9176888f251a27e8c1fb55151))
* niftysave pin job failures by adopting request timeouts ([#267](https://www.github.com/nftstorage/nft.storage/issues/267)) ([0bac638](https://www.github.com/nftstorage/nft.storage/commit/0bac6385ef0417a7a3453172bf3a3ed9e664f9e6))
* optional chaining in uncaught errors ([#701](https://www.github.com/nftstorage/nft.storage/issues/701)) ([2d268ed](https://www.github.com/nftstorage/nft.storage/commit/2d268ed5c90d829798fe9ee72fd2a0ff07e70783))
* performance global not available in cloud env ([#665](https://www.github.com/nftstorage/nft.storage/issues/665)) ([7d958b7](https://www.github.com/nftstorage/nft.storage/commit/7d958b75aee861eb1f33df8a2daa9a4da66ac54b))
* resource migration ([#500](https://www.github.com/nftstorage/nft.storage/issues/500)) ([42ceea8](https://www.github.com/nftstorage/nft.storage/commit/42ceea80041eafe2f67d91805ec32242d01e63b7))
* switch niftysave analyzer to pull from new queue endpoint ([#369](https://www.github.com/nftstorage/nft.storage/issues/369)) ([98bf9c7](https://www.github.com/nftstorage/nft.storage/commit/98bf9c726b90001fe959f141b0f0e66f878b8a31))
* switch to node 16 everywhere ([#563](https://www.github.com/nftstorage/nft.storage/issues/563)) ([042c285](https://www.github.com/nftstorage/nft.storage/commit/042c2857a44619edf02b1af28e53d01e0e5c3d08))
* temporarily revert engines restriction ([#559](https://www.github.com/nftstorage/nft.storage/issues/559)) ([4963ba5](https://www.github.com/nftstorage/nft.storage/commit/4963ba5d0b1028892f1112206ae0fec4e236201c))
* typo in niftysave query ([#630](https://www.github.com/nftstorage/nft.storage/issues/630)) ([7a2b12c](https://www.github.com/nftstorage/nft.storage/commit/7a2b12cde9d58d5f9588c4b4a8de0c306ebddfaa))
* unblock niftysave ([#257](https://www.github.com/nftstorage/nft.storage/issues/257)) ([7fc56bd](https://www.github.com/nftstorage/nft.storage/commit/7fc56bdfbbbbe6a59a1ff7df9a42c81aad100635))
* update links to moved repo ([#650](https://www.github.com/nftstorage/nft.storage/issues/650)) ([df94aaa](https://www.github.com/nftstorage/nft.storage/commit/df94aaa8f1ec1a2e7d60a258a90758b2df630c9a))
* update niftysave deps and lock ipld/jd-dag-json to 8.0.4 ([#881](https://www.github.com/nftstorage/nft.storage/issues/881)) ([af7524f](https://www.github.com/nftstorage/nft.storage/commit/af7524fbf1240b804bbbe356afb90ec4d2bd86b1))
* update the cursor in both spots ([#712](https://www.github.com/nftstorage/nft.storage/issues/712)) ([2166fcb](https://www.github.com/nftstorage/nft.storage/commit/2166fcbbd5d0c8278c7e72bafa291406e0a61275)), closes [#711](https://www.github.com/nftstorage/nft.storage/issues/711)


### Changes

* better comments and types for migration ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* improve niftysave migration error reporting ([#467](https://www.github.com/nftstorage/nft.storage/issues/467)) ([2bbc394](https://www.github.com/nftstorage/nft.storage/commit/2bbc394dc94a13473c55dd15b1530ca96ca6bbe2))
* prettier and LF line endings (no functional changes) ([#580](https://www.github.com/nftstorage/nft.storage/issues/580)) ([e1e5bc4](https://www.github.com/nftstorage/nft.storage/commit/e1e5bc47e5ae112a0775a25b275691a818665f37))
* regenerates all generated files to type migrations ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* remove fauna ([#564](https://www.github.com/nftstorage/nft.storage/issues/564)) ([55c8dcb](https://www.github.com/nftstorage/nft.storage/commit/55c8dcbe925582a6a8e05d1feb80f903c20250ec))
* remove obsolete code supportig niftysave migration ([#594](https://www.github.com/nftstorage/nft.storage/issues/594)) ([0e0979e](https://www.github.com/nftstorage/nft.storage/commit/0e0979e0b09dcb0efc47275c7146535fb7aaff7a))
* resets the cursor so that we start from beginning ([#592](https://www.github.com/nftstorage/nft.storage/issues/592)) ([b50be42](https://www.github.com/nftstorage/nft.storage/commit/b50be4271d30962fb241eacfdcc698bd50e39b27))
* temporarily workaround node16 dependency ([#582](https://www.github.com/nftstorage/nft.storage/issues/582)) ([236c8a4](https://www.github.com/nftstorage/nft.storage/commit/236c8a4105f91bcd0fd18095ee3a31c904254c12))
* update licences to dual mit and apache ([#909](https://www.github.com/nftstorage/nft.storage/issues/909)) ([307a8e2](https://www.github.com/nftstorage/nft.storage/commit/307a8e20526bef0f3ac516eb60fcd4fd82a0d65e))

## 1.0.0 (2021-07-13)


### Features

* enable niftysave ([#238](https://www.github.com/nftstorage/nft.storage/issues/238)) ([61a30ef](https://www.github.com/nftstorage/nft.storage/commit/61a30efea3879ec38ba97d0e5b4d300182b50908))
* improvements to the setup ([#246](https://www.github.com/nftstorage/nft.storage/issues/246)) ([6a2501f](https://www.github.com/nftstorage/nft.storage/commit/6a2501f5c340af87c1571886961920280afec249))
* migrate niftysave ([#229](https://www.github.com/nftstorage/nft.storage/issues/229)) ([98d83ea](https://www.github.com/nftstorage/nft.storage/commit/98d83ea00a26363632ddaa33ab632831218f5a1e))
* update pw-test so its easier to run sw tests ([#240](https://www.github.com/nftstorage/nft.storage/issues/240)) ([5737ffc](https://www.github.com/nftstorage/nft.storage/commit/5737ffcb0323e20b31fdabdd305da075b92a9047))
