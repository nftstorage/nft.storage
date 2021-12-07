# Changelog

## 1.0.0 (2021-12-07)


### Features

* adds constraints to handle edge cases in migration scripts ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* adds docker images for postgres and hasura ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* adds sql provision script in the database_v2 package ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* generalized migration script, and independent migrations per-entity ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* niftysave abstraction for uri_hash ([#482](https://www.github.com/nftstorage/nft.storage/issues/482)) ([8ef4965](https://www.github.com/nftstorage/nft.storage/commit/8ef4965b00696f03f92958fd3eec829f00e6b702))
* niftysave nft parsed state & foreign keys ([#629](https://www.github.com/nftstorage/nft.storage/issues/629)) ([66d2f49](https://www.github.com/nftstorage/nft.storage/commit/66d2f491e7b5a0e8c59fb2d1cf978e11cd289d6c))
* niftysave postgres migration ([#442](https://www.github.com/nftstorage/nft.storage/issues/442)) ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* postgres backend for niftysave ([4ad6035](https://www.github.com/nftstorage/nft.storage/commit/4ad6035916170fdbb0588ce5e855e4d048795cf8))
* remove kv code, update deps and improve client docs ([#714](https://www.github.com/nftstorage/nft.storage/issues/714)) ([22c4e50](https://www.github.com/nftstorage/nft.storage/commit/22c4e507c527d20d9a0587bee0380ea3471f45fe))
* rewire niftysave analyzer ([#517](https://www.github.com/nftstorage/nft.storage/issues/517)) ([b6b908d](https://www.github.com/nftstorage/nft.storage/commit/b6b908d80acb5bb18efa9e6bbea445b3bb30e1a4))
* rewire niftysave pinner to new backend ([#553](https://www.github.com/nftstorage/nft.storage/issues/553)) ([c7e9f9e](https://www.github.com/nftstorage/nft.storage/commit/c7e9f9e9778114b46a8d039130e06e9dbf5e8062))
* table provisioning script via hasura migrations ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))


### Bug Fixes

* change niftysave schema to use uri hashes as primary keys ([#476](https://www.github.com/nftstorage/nft.storage/issues/476)) ([b501171](https://www.github.com/nftstorage/nft.storage/commit/b501171c3cd0292ee397605497e069a324cae8ca))
* hasuara migration promlem ([#562](https://www.github.com/nftstorage/nft.storage/issues/562)) ([f41f921](https://www.github.com/nftstorage/nft.storage/commit/f41f92100091195dcb2e71e86f9f8297e94395a9))
* implement schema changes to match nft.storage tables ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* sql syntax in link_token_asset migration  ([#557](https://www.github.com/nftstorage/nft.storage/issues/557)) ([df76025](https://www.github.com/nftstorage/nft.storage/commit/df76025b4dac1f8a111abcfd596ff948dd80d29e))
* update links to moved repo ([#650](https://www.github.com/nftstorage/nft.storage/issues/650)) ([df94aaa](https://www.github.com/nftstorage/nft.storage/commit/df94aaa8f1ec1a2e7d60a258a90758b2df630c9a))
* use immutable pgcrypto digest ([#480](https://www.github.com/nftstorage/nft.storage/issues/480)) ([1daad10](https://www.github.com/nftstorage/nft.storage/commit/1daad1084d30da527b61c27d0ea8e99eb6eaf5b8))
* wrong column type in nft_ownership ([#567](https://www.github.com/nftstorage/nft.storage/issues/567)) ([62e4cc2](https://www.github.com/nftstorage/nft.storage/commit/62e4cc2503f2b78fe76399db2ff0db17e03e2e5e))


### Changes

* better comments and types for migration ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* niftysave combine owner tables ([#595](https://www.github.com/nftstorage/nft.storage/issues/595)) ([093b83d](https://www.github.com/nftstorage/nft.storage/commit/093b83da80371f998363001f9b12c89b640d9966))
* prettier and LF line endings (no functional changes) ([#580](https://www.github.com/nftstorage/nft.storage/issues/580)) ([e1e5bc4](https://www.github.com/nftstorage/nft.storage/commit/e1e5bc47e5ae112a0775a25b275691a818665f37))
* regenerates all generated files to type migrations ([161e37b](https://www.github.com/nftstorage/nft.storage/commit/161e37b5f615e3db238a20d1edda3c779ac658b5))
* remove obsolete code supportig niftysave migration ([#594](https://www.github.com/nftstorage/nft.storage/issues/594)) ([0e0979e](https://www.github.com/nftstorage/nft.storage/commit/0e0979e0b09dcb0efc47275c7146535fb7aaff7a))
* update licences to dual mit and apache ([#909](https://www.github.com/nftstorage/nft.storage/issues/909)) ([307a8e2](https://www.github.com/nftstorage/nft.storage/commit/307a8e20526bef0f3ac516eb60fcd4fd82a0d65e))
