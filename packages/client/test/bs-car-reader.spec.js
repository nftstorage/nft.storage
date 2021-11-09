import * as assert from 'uvu/assert'
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'
import { CID } from 'multiformats'
import { BlockstoreCarReader } from '../src/bs-car-reader.js'
import { randomBlock } from './helpers.js'

describe('Blockstore CAR Reader', () => {
  it('should expose CAR version', () => {
    const version = 1
    const roots = [
      CID.parse('bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi'),
    ]
    const bs = new MemoryBlockStore()
    const car = new BlockstoreCarReader(version, roots, bs)
    assert.equal(car.version, version)
  })

  it('should determine existence of CID', async () => {
    const block = await randomBlock()
    const version = 1
    const roots = [block.cid]
    const bs = new MemoryBlockStore()
    await bs.put(block.cid, block.bytes)
    const car = new BlockstoreCarReader(version, roots, bs)
    assert.ok(await car.has(block.cid))
    const externalCid = CID.parse(
      'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi'
    )
    assert.not.ok(await car.has(externalCid))
  })

  it('should iterate blocks', async () => {
    const rootBlock = await randomBlock()
    const block = await randomBlock()
    const version = 1
    const roots = [rootBlock.cid]
    const bs = new MemoryBlockStore()
    await bs.put(rootBlock.cid, rootBlock.bytes)
    await bs.put(block.cid, block.bytes)
    const car = new BlockstoreCarReader(version, roots, bs)

    const blocks = []
    for await (const b of car.blocks()) {
      blocks.push(b)
    }

    assert.equal(blocks.length, 2)
    assert.ok(blocks[0] && blocks[0].cid.equals(rootBlock.cid))
    assert.ok(blocks[1] && blocks[1].cid.equals(block.cid))
  })

  it('should iterate CIDs', async () => {
    const rootBlock = await randomBlock()
    const block = await randomBlock()
    const version = 1
    const roots = [rootBlock.cid]
    const bs = new MemoryBlockStore()
    await bs.put(rootBlock.cid, rootBlock.bytes)
    await bs.put(block.cid, block.bytes)
    const car = new BlockstoreCarReader(version, roots, bs)

    const cids = []
    for await (const cid of car.cids()) {
      cids.push(cid)
    }

    assert.equal(cids.length, 2)
    assert.ok(cids[0] && cids[0].equals(rootBlock.cid))
    assert.ok(cids[1] && cids[1].equals(block.cid))
  })

  it('should expose blockstore', async () => {
    const block = await randomBlock()
    const version = 1
    const roots = [block.cid]
    const bs = new MemoryBlockStore()
    const car = new BlockstoreCarReader(version, roots, bs)
    assert.ok(bs === car.blockstore)
  })
})
