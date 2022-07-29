# Changelog

## [7.0.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.4.1...nft.storage-v7.0.0) (2022-07-29)


### ⚠ BREAKING CHANGES

* rate-limit ucan auth requests (#2097)

### Features

* rate-limit ucan auth requests ([#2097](https://github.com/nftstorage/nft.storage/issues/2097)) ([1e43a31](https://github.com/nftstorage/nft.storage/commit/1e43a31d7a0d9ba96dda50bc492aca7352d42a17))

## [6.4.1](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.4.0...nft.storage-v6.4.1) (2022-07-18)


### Bug Fixes

* add missing dep it-pipe ([#2076](https://github.com/nftstorage/nft.storage/issues/2076)) ([8df636c](https://github.com/nftstorage/nft.storage/commit/8df636c50400d1c97f5d4e57b816f4c8e7df00dc))
* file import in some ts configurations ([#1915](https://github.com/nftstorage/nft.storage/issues/1915)) ([878a113](https://github.com/nftstorage/nft.storage/commit/878a113403d2be1331bda8077407ba5edaca16ba))
* link to NFTStorage constructor in API reference docs ([#2005](https://github.com/nftstorage/nft.storage/issues/2005)) ([4eddd01](https://github.com/nftstorage/nft.storage/commit/4eddd01a78e4948d4b1e39ba88f4dee05140f512))

## [6.4.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.3.0...nft.storage-v6.4.0) (2022-06-28)


### Features

* abortable requests ([#2027](https://github.com/nftstorage/nft.storage/issues/2027)) ([44e6a06](https://github.com/nftstorage/nft.storage/commit/44e6a0649be7719570c2bdbc3634853395d9376e))

## [6.3.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.2.0...nft.storage-v6.3.0) (2022-05-19)


### Features

* storeDirectory accepts files as AsyncIterable<File> ([#1920](https://github.com/nftstorage/nft.storage/issues/1920)) ([27394f6](https://github.com/nftstorage/nft.storage/commit/27394f6435ebfbead8cad609b2e92be4b69b4661))
* storeDirectory accepts iter of file objects ([#1924](https://github.com/nftstorage/nft.storage/issues/1924)) ([377b045](https://github.com/nftstorage/nft.storage/commit/377b045995460ac24faac0b5b21eff7e213a6274))

## [6.2.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.1.0...nft.storage-v6.2.0) (2022-04-08)


### Features

* add rate limiter ([#1647](https://github.com/nftstorage/nft.storage/issues/1647)) ([7726c64](https://github.com/nftstorage/nft.storage/commit/7726c646b84624ede58dd8cac7913fc8d4431f16))

## [6.1.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.0.2...nft.storage-v6.1.0) (2022-03-23)


### Features

* add stats page ([#1376](https://github.com/nftstorage/nft.storage/issues/1376)) ([db62471](https://github.com/nftstorage/nft.storage/commit/db624711f10b672a3422e149092f4df0a5495d91))


### Bug Fixes

* create stream when needed ([#1693](https://github.com/nftstorage/nft.storage/issues/1693)) ([6dd3368](https://github.com/nftstorage/nft.storage/commit/6dd33685e236f7dbd1343c338d6e29ba6efd9d4e))

### [6.0.2](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.0.1...nft.storage-v6.0.2) (2022-03-07)


### Bug Fixes

* rate limit error message ([#1154](https://github.com/nftstorage/nft.storage/issues/1154)) ([f449126](https://github.com/nftstorage/nft.storage/commit/f4491267b4f596a4871a52f9582d063dd4dc4ec7))

### [6.0.1](https://github.com/nftstorage/nft.storage/compare/nft.storage-v6.0.0...nft.storage-v6.0.1) (2022-03-01)


### Bug Fixes

* gateway url in client ([#1425](https://github.com/nftstorage/nft.storage/issues/1425)) ([785a1db](https://github.com/nftstorage/nft.storage/commit/785a1db360dfc7947b4e3e1289fb9de3b2ac3c58))
* link to main branch from generated client docs ([#1430](https://github.com/nftstorage/nft.storage/issues/1430)) ([b0a1f8e](https://github.com/nftstorage/nft.storage/commit/b0a1f8e8f0a9f551e933dee1dc3c67a61aa8444a))
* update ipfs car and client ([#1373](https://github.com/nftstorage/nft.storage/issues/1373)) ([2b61549](https://github.com/nftstorage/nft.storage/commit/2b61549f4f31684a6afca28c9f7ed39dc076ada2))

## [6.0.0](https://github.com/nftstorage/nft.storage/compare/nft.storage-v5.2.1...nft.storage-v6.0.0) (2022-02-09)


### ⚠ BREAKING CHANGES

* update dependencies (#833)
* automatic client side CAR chunking for large data (#588)

### Features

* add marketplace logos ([#840](https://github.com/nftstorage/nft.storage/issues/840)) ([f02ee96](https://github.com/nftstorage/nft.storage/commit/f02ee9648bbb284399b00c0d11e3445166b95bbf))
* add X-Client header ([#849](https://github.com/nftstorage/nft.storage/issues/849)) ([e8f7bed](https://github.com/nftstorage/nft.storage/commit/e8f7bed8953a6894421f1a72105d7775b4e72f2e))
* automatic client side CAR chunking for large data ([#588](https://github.com/nftstorage/nft.storage/issues/588)) ([437ae4f](https://github.com/nftstorage/nft.storage/commit/437ae4f313d800939857a074d28072e30a377cad))
* blog ([#838](https://github.com/nftstorage/nft.storage/issues/838)) ([ad1aa99](https://github.com/nftstorage/nft.storage/commit/ad1aa99733f7faf00128e20ee481eef89043631b))
* migrate database to postgres  ([#263](https://github.com/nftstorage/nft.storage/issues/263)) ([ff0c919](https://github.com/nftstorage/nft.storage/commit/ff0c919ad63f8452357ff5f23b3f1ecd24880c86))
* New docs internal integration ([#1044](https://github.com/nftstorage/nft.storage/issues/1044)) ([2d8c67a](https://github.com/nftstorage/nft.storage/commit/2d8c67a8fe99c112001867d2cac6b14ca9f02e89))
* remove custom multipart parser ([#336](https://github.com/nftstorage/nft.storage/issues/336)) ([029e71a](https://github.com/nftstorage/nft.storage/commit/029e71aefc1b152a080ffb5739e4f7c2565a1e57))
* seo optimization ([#765](https://github.com/nftstorage/nft.storage/issues/765)) ([d4a650c](https://github.com/nftstorage/nft.storage/commit/d4a650c7e8794504f697684018f3849c98357923))
* support any IPLD decoder ([#587](https://github.com/nftstorage/nft.storage/issues/587)) ([278c9e2](https://github.com/nftstorage/nft.storage/commit/278c9e22565fee2aa1d1834cebca207bb31fb17f))
* update examples ([#894](https://github.com/nftstorage/nft.storage/issues/894)) ([8387be3](https://github.com/nftstorage/nft.storage/commit/8387be3cae6b9de66bfd43ac5df6868e190dfc9f))


### Bug Fixes

* add interface.ts to fix docs ([#807](https://github.com/nftstorage/nft.storage/issues/807)) ([64e4b2d](https://github.com/nftstorage/nft.storage/commit/64e4b2d435b7876d4cb937f3e511bd833589a495))
* add pre-bundled esm build to package exports ([#1234](https://github.com/nftstorage/nft.storage/issues/1234)) ([05c5b96](https://github.com/nftstorage/nft.storage/commit/05c5b96eac977a4d078ae0164f01cb9376dd899c))
* add prebuilt bundle ([#878](https://github.com/nftstorage/nft.storage/issues/878)) ([b673479](https://github.com/nftstorage/nft.storage/commit/b673479f0e0874fb7fc46aa728dd77ef3cbc717e))
* bad dag creation by store api ([#343](https://github.com/nftstorage/nft.storage/issues/343)) ([307e6cd](https://github.com/nftstorage/nft.storage/commit/307e6cd07e4b3587a404ea8fa367721f574d4e32))
* broken links in client readme ([#294](https://github.com/nftstorage/nft.storage/issues/294)) ([afaa41e](https://github.com/nftstorage/nft.storage/commit/afaa41ef9398a4bf72cf98530b1035f7408577ba))
* capitalization ([d62e70b](https://github.com/nftstorage/nft.storage/commit/d62e70bf6bec1c0d6d9f33c74bb8404d8f746b5a))
* client close blockstore on store directory and store blob ([#1198](https://github.com/nftstorage/nft.storage/issues/1198)) ([50210f0](https://github.com/nftstorage/nft.storage/commit/50210f03c4032a96e0b95df0f5189711c97ac5ca))
* **client:** avoid single arg arrow fn ([a425ed2](https://github.com/nftstorage/nft.storage/commit/a425ed25a11b279f141c16d210782b8fbe47c6c4))
* **client:** bump version for release ([3df7fcf](https://github.com/nftstorage/nft.storage/commit/3df7fcf8ef2949875eabacee21c8d9d60349b6a1))
* **client:** dont publish everything ([8919819](https://github.com/nftstorage/nft.storage/commit/89198192508ed8cdd2084e312a5488348ea862af))
* **client:** fix back docs output ([628dafd](https://github.com/nftstorage/nft.storage/commit/628dafdb27923a2c794ff611577e5144fd97deaf))
* **client:** test new release ci ([f26c739](https://github.com/nftstorage/nft.storage/commit/f26c739c39104904152010b8aad5da4914e361c9))
* deploy generated client docs to gh-pages branch ([#887](https://github.com/nftstorage/nft.storage/issues/887)) ([5b32e4a](https://github.com/nftstorage/nft.storage/commit/5b32e4a76b066f0d863a1b294a3151627b8a8447))
* do not prefer node.js builtins ([#891](https://github.com/nftstorage/nft.storage/issues/891)) ([84c110a](https://github.com/nftstorage/nft.storage/commit/84c110ac26f954d1770220e279fbe308b32fa92b))
* include bundle in npm files ([#889](https://github.com/nftstorage/nft.storage/issues/889)) ([994f133](https://github.com/nftstorage/nft.storage/commit/994f133b75856cc4045de91723827e345fa26f9f))
* increase website token ttl and update deps ([#943](https://github.com/nftstorage/nft.storage/issues/943)) ([35a3031](https://github.com/nftstorage/nft.storage/commit/35a303145c81e006820ee9cd7de6404bf7a9a86f))
* log call in store.html example ([#715](https://github.com/nftstorage/nft.storage/issues/715)) ([4c47db9](https://github.com/nftstorage/nft.storage/commit/4c47db9521e0311e493ff0b1e87e2f37f0cda1d1))
* make @ipld/dag-cbor a dependency of nft.storage ([#992](https://github.com/nftstorage/nft.storage/issues/992)) ([1ec0b92](https://github.com/nftstorage/nft.storage/commit/1ec0b92111c70740863f59a2fa1250964c5a1cb8))
* Relaxes image/* requirement ([#334](https://github.com/nftstorage/nft.storage/issues/334)) ([f484297](https://github.com/nftstorage/nft.storage/commit/f484297123de4b5eca900831069dcd3fab2ac3b9))
* store directory example ([#1002](https://github.com/nftstorage/nft.storage/issues/1002)) ([79cd4bf](https://github.com/nftstorage/nft.storage/commit/79cd4bf09d8c8ba66aee4bf3532f790afd4ba8d5))
* typos in JS client lib docs ([#1298](https://github.com/nftstorage/nft.storage/issues/1298)) ([5f9568c](https://github.com/nftstorage/nft.storage/commit/5f9568c7164138ba737662721bb4bd9abbfa06ec))
* unblock niftysave ([#257](https://github.com/nftstorage/nft.storage/issues/257)) ([7fc56bd](https://github.com/nftstorage/nft.storage/commit/7fc56bdfbbbbe6a59a1ff7df9a42c81aad100635))
* update links to moved repo ([#650](https://github.com/nftstorage/nft.storage/issues/650)) ([df94aaa](https://github.com/nftstorage/nft.storage/commit/df94aaa8f1ec1a2e7d60a258a90758b2df630c9a))
* update niftysave deps and lock ipld/jd-dag-json to 8.0.4 ([#881](https://github.com/nftstorage/nft.storage/issues/881)) ([af7524f](https://github.com/nftstorage/nft.storage/commit/af7524fbf1240b804bbbe356afb90ec4d2bd86b1))
* **website:** fix api docs error ([#352](https://github.com/nftstorage/nft.storage/issues/352)) ([073d5aa](https://github.com/nftstorage/nft.storage/commit/073d5aa29b62de9253e1d362eaf1347b69929fa8)), closes [#348](https://github.com/nftstorage/nft.storage/issues/348)
* **website:** remove type ([94fe5e5](https://github.com/nftstorage/nft.storage/commit/94fe5e50fc581d4ac9062630258934458cb91728))


### Miscellaneous Chores

* update dependencies ([#833](https://github.com/nftstorage/nft.storage/issues/833)) ([27b1adc](https://github.com/nftstorage/nft.storage/commit/27b1adc8eb3ced95358c7619d2e4bcd7803128d2))

### [5.2.4](https://github.com/nftstorage/nft.storage/compare/client-v5.2.3...client-v5.2.4) (2022-02-03)


### Bug Fixes

* add pre-bundled esm build to package exports ([#1234](https://github.com/nftstorage/nft.storage/issues/1234)) ([05c5b96](https://github.com/nftstorage/nft.storage/commit/05c5b96eac977a4d078ae0164f01cb9376dd899c))

### [5.2.3](https://github.com/nftstorage/nft.storage/compare/client-v5.2.2...client-v5.2.3) (2022-02-03)


### Bug Fixes

* client close blockstore on store directory and store blob ([#1198](https://github.com/nftstorage/nft.storage/issues/1198)) ([50210f0](https://github.com/nftstorage/nft.storage/commit/50210f03c4032a96e0b95df0f5189711c97ac5ca))

### [5.2.2](https://github.com/nftstorage/nft.storage/compare/client-v5.2.1...client-v5.2.2) (2022-01-24)


### Bug Fixes

* **client:** test new release ci ([f26c739](https://github.com/nftstorage/nft.storage/commit/f26c739c39104904152010b8aad5da4914e361c9))
* **website:** remove type ([94fe5e5](https://github.com/nftstorage/nft.storage/commit/94fe5e50fc581d4ac9062630258934458cb91728))

### [5.2.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.2.0...nft.storage-v5.2.1) (2022-01-06)


### Bug Fixes

* store directory example ([#1002](https://www.github.com/nftstorage/nft.storage/issues/1002)) ([79cd4bf](https://www.github.com/nftstorage/nft.storage/commit/79cd4bf09d8c8ba66aee4bf3532f790afd4ba8d5))


### Changes

* updated dag to ot be restricted ([#1004](https://www.github.com/nftstorage/nft.storage/issues/1004)) ([f002a98](https://www.github.com/nftstorage/nft.storage/commit/f002a98d47db0618ae0d3b48f0d4ef0a12b23da0))

## [5.2.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.1.3...nft.storage-v5.2.0) (2021-12-17)


### Features

* blog ([#838](https://www.github.com/nftstorage/nft.storage/issues/838)) ([ad1aa99](https://www.github.com/nftstorage/nft.storage/commit/ad1aa99733f7faf00128e20ee481eef89043631b))
* update examples ([#894](https://www.github.com/nftstorage/nft.storage/issues/894)) ([8387be3](https://www.github.com/nftstorage/nft.storage/commit/8387be3cae6b9de66bfd43ac5df6868e190dfc9f))


### Bug Fixes

* increase website token ttl and update deps ([#943](https://www.github.com/nftstorage/nft.storage/issues/943)) ([35a3031](https://www.github.com/nftstorage/nft.storage/commit/35a303145c81e006820ee9cd7de6404bf7a9a86f))
* make @ipld/dag-cbor a dependency of nft.storage ([#992](https://www.github.com/nftstorage/nft.storage/issues/992)) ([1ec0b92](https://www.github.com/nftstorage/nft.storage/commit/1ec0b92111c70740863f59a2fa1250964c5a1cb8))
* update niftysave deps and lock ipld/jd-dag-json to 8.0.4 ([#881](https://www.github.com/nftstorage/nft.storage/issues/881)) ([af7524f](https://www.github.com/nftstorage/nft.storage/commit/af7524fbf1240b804bbbe356afb90ec4d2bd86b1))


### Changes

* update licences to dual mit and apache ([#909](https://www.github.com/nftstorage/nft.storage/issues/909)) ([307a8e2](https://www.github.com/nftstorage/nft.storage/commit/307a8e20526bef0f3ac516eb60fcd4fd82a0d65e))

### [5.1.3](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.1.2...nft.storage-v5.1.3) (2021-12-03)


### Bug Fixes

* do not prefer node.js builtins ([#891](https://www.github.com/nftstorage/nft.storage/issues/891)) ([84c110a](https://www.github.com/nftstorage/nft.storage/commit/84c110ac26f954d1770220e279fbe308b32fa92b))

### [5.1.2](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.1.1...nft.storage-v5.1.2) (2021-12-03)


### Bug Fixes

* include bundle in npm files ([#889](https://www.github.com/nftstorage/nft.storage/issues/889)) ([994f133](https://www.github.com/nftstorage/nft.storage/commit/994f133b75856cc4045de91723827e345fa26f9f))

### [5.1.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.1.0...nft.storage-v5.1.1) (2021-12-03)


### Bug Fixes

* deploy generated client docs to gh-pages branch ([#887](https://www.github.com/nftstorage/nft.storage/issues/887)) ([5b32e4a](https://www.github.com/nftstorage/nft.storage/commit/5b32e4a76b066f0d863a1b294a3151627b8a8447))

## [5.1.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v5.0.0...nft.storage-v5.1.0) (2021-12-02)


### Features

* add marketplace logos ([#840](https://www.github.com/nftstorage/nft.storage/issues/840)) ([f02ee96](https://www.github.com/nftstorage/nft.storage/commit/f02ee9648bbb284399b00c0d11e3445166b95bbf))
* add X-Client header ([#849](https://www.github.com/nftstorage/nft.storage/issues/849)) ([e8f7bed](https://www.github.com/nftstorage/nft.storage/commit/e8f7bed8953a6894421f1a72105d7775b4e72f2e))
* seo optimization ([#765](https://www.github.com/nftstorage/nft.storage/issues/765)) ([d4a650c](https://www.github.com/nftstorage/nft.storage/commit/d4a650c7e8794504f697684018f3849c98357923))


### Bug Fixes

* add prebuilt bundle ([#878](https://www.github.com/nftstorage/nft.storage/issues/878)) ([b673479](https://www.github.com/nftstorage/nft.storage/commit/b673479f0e0874fb7fc46aa728dd77ef3cbc717e))

## [5.0.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v4.0.1...nft.storage-v5.0.0) (2021-11-22)


### ⚠ BREAKING CHANGES

* update dependencies (#833)

### Changes

* update dependencies ([#833](https://www.github.com/nftstorage/nft.storage/issues/833)) ([27b1adc](https://www.github.com/nftstorage/nft.storage/commit/27b1adc8eb3ced95358c7619d2e4bcd7803128d2))

### [4.0.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v4.0.0...nft.storage-v4.0.1) (2021-11-18)


### Bug Fixes

* add interface.ts to fix docs ([#807](https://www.github.com/nftstorage/nft.storage/issues/807)) ([64e4b2d](https://www.github.com/nftstorage/nft.storage/commit/64e4b2d435b7876d4cb937f3e511bd833589a495))

## [4.0.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.4.0...nft.storage-v4.0.0) (2021-11-16)


### ⚠ BREAKING CHANGES

* automatic client side CAR chunking for large data (#588)

### Features

* automatic client side CAR chunking for large data ([#588](https://www.github.com/nftstorage/nft.storage/issues/588)) ([437ae4f](https://www.github.com/nftstorage/nft.storage/commit/437ae4f313d800939857a074d28072e30a377cad))
* remove kv code, update deps and improve client docs ([#714](https://www.github.com/nftstorage/nft.storage/issues/714)) ([22c4e50](https://www.github.com/nftstorage/nft.storage/commit/22c4e507c527d20d9a0587bee0380ea3471f45fe))

## [3.4.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.3.0...nft.storage-v3.4.0) (2021-11-08)


### Features

* support any IPLD decoder ([#587](https://www.github.com/nftstorage/nft.storage/issues/587)) ([278c9e2](https://www.github.com/nftstorage/nft.storage/commit/278c9e22565fee2aa1d1834cebca207bb31fb17f))


### Bug Fixes

* log call in store.html example ([#715](https://www.github.com/nftstorage/nft.storage/issues/715)) ([4c47db9](https://www.github.com/nftstorage/nft.storage/commit/4c47db9521e0311e493ff0b1e87e2f37f0cda1d1))
* update links to moved repo ([#650](https://www.github.com/nftstorage/nft.storage/issues/650)) ([df94aaa](https://www.github.com/nftstorage/nft.storage/commit/df94aaa8f1ec1a2e7d60a258a90758b2df630c9a))


### Changes

* prettier and LF line endings (no functional changes) ([#580](https://www.github.com/nftstorage/nft.storage/issues/580)) ([e1e5bc4](https://www.github.com/nftstorage/nft.storage/commit/e1e5bc47e5ae112a0775a25b275691a818665f37))
* update example dependencies ([f1ca9db](https://www.github.com/nftstorage/nft.storage/commit/f1ca9dbed41cad4a21b1f27f78abf84307194840))

## [3.3.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.2.2...nft.storage-v3.3.0) (2021-09-29)


### Features

* migrate database to postgres  ([#263](https://www.github.com/nftstorage/nft.storage/issues/263)) ([ff0c919](https://www.github.com/nftstorage/nft.storage/commit/ff0c919ad63f8452357ff5f23b3f1ecd24880c86))

### [3.2.2](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.2.1...nft.storage-v3.2.2) (2021-09-14)


### Bug Fixes

* capitalization ([d62e70b](https://www.github.com/nftstorage/nft.storage/commit/d62e70bf6bec1c0d6d9f33c74bb8404d8f746b5a))

### [3.2.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.2.0...nft.storage-v3.2.1) (2021-08-30)


### Bug Fixes

* **website:** fix api docs error ([#352](https://www.github.com/nftstorage/nft.storage/issues/352)) ([073d5aa](https://www.github.com/nftstorage/nft.storage/commit/073d5aa29b62de9253e1d362eaf1347b69929fa8)), closes [#348](https://www.github.com/nftstorage/nft.storage/issues/348)

## [3.2.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.1.3...nft.storage-v3.2.0) (2021-08-27)


### Features

* remove custom multipart parser ([#336](https://www.github.com/nftstorage/nft.storage/issues/336)) ([029e71a](https://www.github.com/nftstorage/nft.storage/commit/029e71aefc1b152a080ffb5739e4f7c2565a1e57))


### Bug Fixes

* bad dag creation by store api ([#343](https://www.github.com/nftstorage/nft.storage/issues/343)) ([307e6cd](https://www.github.com/nftstorage/nft.storage/commit/307e6cd07e4b3587a404ea8fa367721f574d4e32))
* Relaxes image/* requirement ([#334](https://www.github.com/nftstorage/nft.storage/issues/334)) ([f484297](https://www.github.com/nftstorage/nft.storage/commit/f484297123de4b5eca900831069dcd3fab2ac3b9))

### [3.1.3](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.1.2...nft.storage-v3.1.3) (2021-08-11)


### Bug Fixes

* **client:** fix back docs output ([628dafd](https://www.github.com/nftstorage/nft.storage/commit/628dafdb27923a2c794ff611577e5144fd97deaf))

### [3.1.2](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.1.1...nft.storage-v3.1.2) (2021-08-11)


### Bug Fixes

* **client:** bump version for release ([3df7fcf](https://www.github.com/nftstorage/nft.storage/commit/3df7fcf8ef2949875eabacee21c8d9d60349b6a1))

### [3.1.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.1.0...nft.storage-v3.1.1) (2021-08-11)


### Bug Fixes

* **client:** dont publish everything ([8919819](https://www.github.com/nftstorage/nft.storage/commit/89198192508ed8cdd2084e312a5488348ea862af))

## [3.1.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.0.1...nft.storage-v3.1.0) (2021-08-10)


### Features

* esbuild to build api and new tests ([#252](https://www.github.com/nftstorage/nft.storage/issues/252)) ([3cafc29](https://www.github.com/nftstorage/nft.storage/commit/3cafc29c0932b36421424827eca04323c26b22f9))
* improvements to the setup ([#246](https://www.github.com/nftstorage/nft.storage/issues/246)) ([6a2501f](https://www.github.com/nftstorage/nft.storage/commit/6a2501f5c340af87c1571886961920280afec249))
* update pw-test so its easier to run sw tests ([#240](https://www.github.com/nftstorage/nft.storage/issues/240)) ([5737ffc](https://www.github.com/nftstorage/nft.storage/commit/5737ffcb0323e20b31fdabdd305da075b92a9047))


### Bug Fixes

* broken links in client readme ([#294](https://www.github.com/nftstorage/nft.storage/issues/294)) ([afaa41e](https://www.github.com/nftstorage/nft.storage/commit/afaa41ef9398a4bf72cf98530b1035f7408577ba))
* **client:** avoid single arg arrow fn ([a425ed2](https://www.github.com/nftstorage/nft.storage/commit/a425ed25a11b279f141c16d210782b8fbe47c6c4))
* unblock niftysave ([#257](https://www.github.com/nftstorage/nft.storage/issues/257)) ([7fc56bd](https://www.github.com/nftstorage/nft.storage/commit/7fc56bdfbbbbe6a59a1ff7df9a42c81aad100635))

### [3.0.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v3.0.0...nft.storage-v3.0.1) (2021-06-24)


### Bug Fixes

* add storeCar to client interface.ts ([#205](https://www.github.com/nftstorage/nft.storage/issues/205)) ([43c0bd3](https://www.github.com/nftstorage/nft.storage/commit/43c0bd3b888f28978e5ab3ab147393b2c3d24234))
* the CarReader type is a collection of interfaces ([#214](https://www.github.com/nftstorage/nft.storage/issues/214)) ([09fd8cb](https://www.github.com/nftstorage/nft.storage/commit/09fd8cbb49dfb893fd480cc1f94b79afdc2fb769))

## [3.0.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v2.1.1...nft.storage-v3.0.0) (2021-06-22)


### ⚠ BREAKING CHANGES

* car chunking client (#199)

### Features

* car chunking client ([#199](https://www.github.com/nftstorage/nft.storage/issues/199)) ([fdfa8e9](https://www.github.com/nftstorage/nft.storage/commit/fdfa8e9cddcf144b5b643f005e28ed652bf44ca9)), closes [#173](https://www.github.com/nftstorage/nft.storage/issues/173)
* deal data selector ([#198](https://www.github.com/nftstorage/nft.storage/issues/198)) ([7261c53](https://www.github.com/nftstorage/nft.storage/commit/7261c5350aff3f1ff991a8ff5c22d67722da6c5f)), closes [#192](https://www.github.com/nftstorage/nft.storage/issues/192)


### Bug Fixes

* chunking issues ([#203](https://www.github.com/nftstorage/nft.storage/issues/203)) ([d990a20](https://www.github.com/nftstorage/nft.storage/commit/d990a207fd99aa74bde56a5d6b79e5027cf42287))

### [2.1.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v2.1.0...nft.storage-v2.1.1) (2021-06-18)


### Bug Fixes

* car upload example ([#197](https://www.github.com/nftstorage/nft.storage/issues/197)) ([c6b1a68](https://www.github.com/nftstorage/nft.storage/commit/c6b1a68e643390464b3b46a2707a6430c3ce4f74))
* **client:** npm lifecycle build command ([#194](https://www.github.com/nftstorage/nft.storage/issues/194)) ([41138df](https://www.github.com/nftstorage/nft.storage/commit/41138dfe5fe7308eb2b1dd4f9acd82de3a11f63d))
* misc docs issues ([#190](https://www.github.com/nftstorage/nft.storage/issues/190)) ([04e9840](https://www.github.com/nftstorage/nft.storage/commit/04e9840e35903a6738b0e947c150047ce521f912))

## [2.1.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v2.0.0...nft.storage-v2.1.0) (2021-06-15)


### Features

* support CAR file uploads ([#178](https://www.github.com/nftstorage/nft.storage/issues/178)) ([c7e5130](https://www.github.com/nftstorage/nft.storage/commit/c7e5130022ac1d0db13269582bdfa5e60d41bdea))

## [2.0.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v1.4.0...nft.storage-v2.0.0) (2021-06-01)


### ⚠ BREAKING CHANGES

* add ipfs URL to gateway URL converter (#161)

### Features

* add ipfs URL to gateway URL converter ([#161](https://www.github.com/nftstorage/nft.storage/issues/161)) ([f115cd8](https://www.github.com/nftstorage/nft.storage/commit/f115cd8964bc565fc1a3313fc8d2fb3a392dd0ac))

## [1.4.0](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v1.3.1...nft.storage-v1.4.0) (2021-05-26)


### Features

* allow extensions to ERC-1155 metadata ([#146](https://www.github.com/nftstorage/nft.storage/issues/146)) ([f45cf9f](https://www.github.com/nftstorage/nft.storage/commit/f45cf9f32a1143853c533a1a016b8f9443c666dd))

### [1.3.1](https://www.github.com/nftstorage/nft.storage/compare/nft.storage-v1.3.0...nft.storage-v1.3.1) (2021-05-14)


### Bug Fixes

* **client:** fix publish ([052fee0](https://www.github.com/nftstorage/nft.storage/commit/052fee0661256c05378470a2276bb46e99ccbe2d))

## 1.3.0 (2021-05-14)


### Bug Fixes

* **client:** let try auto publish ([46d0e28](https://www.github.com/nftstorage/nft.storage/commit/46d0e284abb8ae4da53e87530ac908e6c776d141))


### Miscellaneous Chores

* **client:** release bump ([23c2457](https://www.github.com/nftstorage/nft.storage/commit/23c2457bee1a8ba967934e95f2cdaa0228c66e6b))
* fix client version ([70ce7e9](https://www.github.com/nftstorage/nft.storage/commit/70ce7e94b4fe3a2fdba7146a5c1ac7cb241c2694))
