# Changelog

### [1.1.2](https://github.com/nftstorage/nft.storage/compare/gateway-v1.1.1...gateway-v1.1.2) (2022-02-14)


### Bug Fixes

* increase gateway timeout ([#1331](https://github.com/nftstorage/nft.storage/issues/1331)) ([c5f5dee](https://github.com/nftstorage/nft.storage/commit/c5f5dee412c36e7d715943cb7031b9078a79ed7c))

### [1.1.1](https://github.com/nftstorage/nft.storage/compare/gateway-v1.1.0...gateway-v1.1.1) (2022-02-11)


### Bug Fixes

* gateway requested with custom header requested from ([#1344](https://github.com/nftstorage/nft.storage/issues/1344)) ([cf841bb](https://github.com/nftstorage/nft.storage/commit/cf841bbf0c2e24d303dae05f494b1b4fcbc500bd))

## [1.1.0](https://github.com/nftstorage/nft.storage/compare/gateway-v1.0.1...gateway-v1.1.0) (2022-02-09)


### Features

* gateway add support for head request ([#1312](https://github.com/nftstorage/nft.storage/issues/1312)) ([f2faf79](https://github.com/nftstorage/nft.storage/commit/f2faf7936588a4754349f3a578ca822ce03877ef))


### Bug Fixes

* gateway metrics route with cached response ([#1311](https://github.com/nftstorage/nft.storage/issues/1311)) ([7a5a72a](https://github.com/nftstorage/nft.storage/commit/7a5a72aacb216ee71ec2f9439a17ffa59816de21))
* not prevent ipfs io requests ([#1230](https://github.com/nftstorage/nft.storage/issues/1230)) ([769a465](https://github.com/nftstorage/nft.storage/commit/769a4658226656de25f69aae5a8de5066c4d2a26))

### [1.0.1](https://github.com/nftstorage/nft.storage/compare/gateway-v1.0.0...gateway-v1.0.1) (2022-02-08)


### Bug Fixes

* path with file and extension ([#1296](https://github.com/nftstorage/nft.storage/issues/1296)) ([a616623](https://github.com/nftstorage/nft.storage/commit/a616623de9991b01003cad013bdd98e0bd91643e))

## 1.0.0 (2022-02-08)


### Features

* gateway add cloudflare cache layer ([#1180](https://github.com/nftstorage/nft.storage/issues/1180)) ([9fc5e67](https://github.com/nftstorage/nft.storage/commit/9fc5e6780bbe70f5d91095492a5d55c3a250be94))
* gateway logtail integration ([#1037](https://github.com/nftstorage/nft.storage/issues/1037)) ([85a82ff](https://github.com/nftstorage/nft.storage/commit/85a82ff0783399368572c158962618a41081d703))
* gateway rate limiting durable object ([#1178](https://github.com/nftstorage/nft.storage/issues/1178)) ([2b632e2](https://github.com/nftstorage/nft.storage/commit/2b632e2c7daac0f3b75a387a624d131d5ae2d092))
* gateway with x-forwarded-for ip for ipfs.io gateway ([#1227](https://github.com/nftstorage/nft.storage/issues/1227)) ([539813d](https://github.com/nftstorage/nft.storage/commit/539813d7984134fe5518dcfcfe32805f320f2809))
* nft.storage naive gateway implementation ([#908](https://github.com/nftstorage/nft.storage/issues/908)) ([119d948](https://github.com/nftstorage/nft.storage/commit/119d948681da11bcae250f19d8b3eae04e5992b4))
* sentry to gateway ([#919](https://github.com/nftstorage/nft.storage/issues/919)) ([8d544d3](https://github.com/nftstorage/nft.storage/commit/8d544d3bc5d969b2f3a5ef988b0d3c35b1092602))
* track cached response times ([#1232](https://github.com/nftstorage/nft.storage/issues/1232)) ([d4f5951](https://github.com/nftstorage/nft.storage/commit/d4f5951fb41ab8139ddfa72dc0c76a62b8503a5b))
* track content length histogram ([#1206](https://github.com/nftstorage/nft.storage/issues/1206)) ([8723412](https://github.com/nftstorage/nft.storage/commit/8723412b414f9c277854aeb12291f6dfd0692bf1))
* track redirect counts ([#1237](https://github.com/nftstorage/nft.storage/issues/1237)) ([88a9085](https://github.com/nftstorage/nft.storage/commit/88a908592b969207283537c9c339542dd9837b55))
* use multiple gateways and track metrics ([#961](https://github.com/nftstorage/nft.storage/issues/961)) ([24df1f6](https://github.com/nftstorage/nft.storage/commit/24df1f69d481ecb07bdbde237af837a812773e3e))


### Bug Fixes

* gateway get durable object request function ([#1264](https://github.com/nftstorage/nft.storage/issues/1264)) ([3e1795d](https://github.com/nftstorage/nft.storage/commit/3e1795d7f8dc98260bf8c4011def27e2d615eea3))
* gateway get headers record ([#1282](https://github.com/nftstorage/nft.storage/issues/1282)) ([8061714](https://github.com/nftstorage/nft.storage/commit/8061714c1b9a336a9c1fee421215fd41e162639c))
* gateway handle errors ([#1262](https://github.com/nftstorage/nft.storage/issues/1262)) ([cdeed06](https://github.com/nftstorage/nft.storage/commit/cdeed06ef02ccc60c227aa017b243964262a75e8))
* gateway histogram metrics ([#1124](https://github.com/nftstorage/nft.storage/issues/1124)) ([a04a616](https://github.com/nftstorage/nft.storage/commit/a04a616b3c42d5ea83494175cdf19b0cd121d5ab))
* gateway metrics track total winner successful requests ([#1122](https://github.com/nftstorage/nft.storage/issues/1122)) ([1e74ca4](https://github.com/nftstorage/nft.storage/commit/1e74ca477ab71cb37e90620312369321601c890f))
* gateway picture with project name updated ([#1170](https://github.com/nftstorage/nft.storage/issues/1170)) ([c8675e2](https://github.com/nftstorage/nft.storage/commit/c8675e27c429dce165ea741a0c78d4452b494007))
* gateway prometheus metrics best practices naming ([#1194](https://github.com/nftstorage/nft.storage/issues/1194)) ([cfb2616](https://github.com/nftstorage/nft.storage/commit/cfb2616bf9a3ef52ec50fb13b0b0095561dd7bd8))
* logtail to log request start and end ([#1118](https://github.com/nftstorage/nft.storage/issues/1118)) ([70c5afc](https://github.com/nftstorage/nft.storage/commit/70c5afca51dec29b55b1683208601e8839f0361a))
* metrics types ([#1261](https://github.com/nftstorage/nft.storage/issues/1261)) ([a0796bf](https://github.com/nftstorage/nft.storage/commit/a0796bff5647940f939582a9d39115d16f3fbd8f))
* only cache when content length smaller than max object size ([#1197](https://github.com/nftstorage/nft.storage/issues/1197)) ([8907f70](https://github.com/nftstorage/nft.storage/commit/8907f70206339582b5726e845c0cc11a83c0b867))
* prometheus histogram requires upper bound +inf ([#1162](https://github.com/nftstorage/nft.storage/issues/1162)) ([02bb41c](https://github.com/nftstorage/nft.storage/commit/02bb41c8c1b5916d8f16109e4763a1e4b8bc3900))
* properly track errors on winner gateway fetch ([#1133](https://github.com/nftstorage/nft.storage/issues/1133)) ([d989ece](https://github.com/nftstorage/nft.storage/commit/d989ecee7b212357aa88e018796b83c44951697f))
* refactor metrics durable object ([#1112](https://github.com/nftstorage/nft.storage/issues/1112)) ([4eee871](https://github.com/nftstorage/nft.storage/commit/4eee8715cbd22c6ff05ff539ecae98f01cc1c320))
* rename gateway package ([#1114](https://github.com/nftstorage/nft.storage/issues/1114)) ([1ffdced](https://github.com/nftstorage/nft.storage/commit/1ffdced29054a105e9ffc4e03ed200911162c854))
* reset durable objects migrations ([#1233](https://github.com/nftstorage/nft.storage/issues/1233)) ([34f0f75](https://github.com/nftstorage/nft.storage/commit/34f0f7542abc1a4ae2566a149d9453089fd9dbf3))
* reset gateway durable objects migrations ([#1289](https://github.com/nftstorage/nft.storage/issues/1289)) ([dff24ba](https://github.com/nftstorage/nft.storage/commit/dff24ba0ab0540290c16ce5824a9700017ecabe5))
* tweak rate limits per gateway ([#1286](https://github.com/nftstorage/nft.storage/issues/1286)) ([427f025](https://github.com/nftstorage/nft.storage/commit/427f025a9159253dcdbd9fc7d108a93b4ed895d3))
* update gateway miniflare to final version ([#1208](https://github.com/nftstorage/nft.storage/issues/1208)) ([c0b2c3e](https://github.com/nftstorage/nft.storage/commit/c0b2c3e193e3f7a932fd249c125f09508b9b9986))
