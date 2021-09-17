import assert from 'assert'
import { createClientWithUser } from './scripts/helpers.js'

const fixtures = {
  dealsV0andV1: [
    {
      status: 'active',
      lastChanged: '2021-09-10T00:45:50.408956+00:00',
      chainDealID: 2424132,
      datamodelSelector: 'Links/19/Hash/Links/46/Hash/Links/0/Hash',
      statusText:
        'containing sector active as of 2021-09-10 00:36:30 at epoch 1097593',
      dealActivation: '2021-09-11T14:11:00+00:00',
      dealExpiration: '2021-09-11T14:11:00+00:00',
      miner: 'f0678914',
      pieceCid:
        'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny',
      batchRootCid:
        'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme',
    },
    {
      status: 'active',
      lastChanged: '2021-09-10T05:40:54.191387+00:00',
      chainDealID: 2425151,
      datamodelSelector: 'Links/19/Hash/Links/46/Hash/Links/0/Hash',
      statusText:
        'containing sector active as of 2021-09-10 05:32:00 at epoch 1098184',
      dealActivation: '2021-09-10T14:41:30+00:00',
      dealExpiration: '2021-09-10T14:41:30+00:00',
      miner: 'f0707721',
      pieceCid:
        'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny',
      batchRootCid:
        'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme',
    },
    {
      status: 'terminated',
      lastChanged: '2021-09-10T08:01:02.911526+00:00',
      chainDealID: 2424780,
      datamodelSelector: 'Links/19/Hash/Links/46/Hash/Links/0/Hash',
      statusText: 'containing sector missed expected sealing epoch 1098402',
      dealActivation: '2021-09-10T07:21:00+00:00',
      dealExpiration: '2021-09-10T07:21:00+00:00',
      miner: 'f01163272',
      pieceCid:
        'baga6ea4seaqfanmqerzaiq7udm5wxx3hcmgapukudbadjarzkadudexamn5gwny',
      batchRootCid:
        'bafybeiek5gau46j4dxoyty27qtirb3iuoq7aax4l3xt25mfk2igyt35bme',
    },
  ],
}

describe('V1 - /check', () => {
  it('check cid v1', async () => {
    const client = await createClientWithUser()
    const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    await client.addPin({
      cid,
      name: 'test-file11',
    })

    const res = await fetch(`v1/check/${cid}`)
    const { ok, value } = await res.json()

    assert.equal(value.cid, cid)
    assert.equal(value.pin.status, 'queued')
    assert.deepStrictEqual(value.deals, fixtures.dealsV0andV1)
  })

  it('check with cid v0', async () => {
    const client = await createClientWithUser()
    const cid = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
    await client.addPin({
      cid,
      name: 'test-file-cid-v0',
    })

    const res = await fetch(`v1/check/${cid}`)
    const { ok, value } = await res.json()
    assert.equal(value.cid, cid)
    assert.equal(value.pin.status, 'queued')
    assert.deepStrictEqual(value.deals, fixtures.dealsV0andV1)
  })

  it('invalid cid error', async () => {
    const cid = 'asdhjkahsdja'
    const res = await fetch(`v1/check/${cid}`)
    const { ok, value, error } = await res.json()

    assert.equal(ok, false)
    assert.deepStrictEqual(error, {
      code: 'ERROR_INVALID_CID',
      message: `Invalid CID: ${cid}`,
    })
  })

  it('not found error', async () => {
    const cid = 'bafybeia22kh3smc7p67oa76pcleaxp4u5zatsvcndi3xrqod5vtxq5avpa'
    const res = await fetch(`v1/check/${cid}`)
    const { ok, value, error } = await res.json()

    assert.equal(ok, false)
    assert.deepStrictEqual(error, {
      code: 'HTTP_ERROR',
      message: `NFT not found`,
    })
  })
})
