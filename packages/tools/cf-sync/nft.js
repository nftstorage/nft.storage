import got from 'got'
import PQueue from 'p-queue'

/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 */

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function syncNFTs(ctx, task) {
  let count = 0
  let missing = 0

  for await (const user of ctx.cf.kvPaginate({
    accountId: ctx.cfAccount,
    kvId: ctx.kvNFT,
  })) {
    count++
    if (!(await ctx.nftStore.has(user.name))) {
      missing++
      await ctx.nftStore.put(user.name, {})
    }
    task.output = `count: ${count} new: ${missing}`
  }

  task.title += ` count: ${count} new: ${missing}`
}

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function syncNFTData(ctx, task) {
  let count = 0
  let deleted = 0
  /**
   * @type {any[]}
   */
  const errors = []
  const queue = new PQueue({
    concurrency: 100,
    interval: 1000,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size} count: ${count} deleted: ${deleted}`
  })

  for await (const { key } of ctx.nftStore.iterator()) {
    count++
    const run = async () => {
      const rsp = await got
        .get(
          'https://nft-storage-migration.protocol-labs.workers.dev/internal/list2',
          {
            searchParams: {
              key,
            },
          }
        )
        .json()
      if (rsp.ok) {
        await ctx.nftStore.put(key, {
          data: rsp.nft,
          pinStatus: rsp.pin.status,
          size: rsp.pin.size,
        })
      } else {
        deleted++
        errors.push(rsp.error)
        await ctx.nftStore.del(key)
      }
    }
    await queue.onSizeLessThan(20000)
    queue.add(() => run())
  }

  await queue.onIdle()
  console.error(errors.join('\n'))
  task.title += ` nfts ${count} deleted ${deleted}`
}

/**
 * @param {Context["nftStore"]} store
 * @param {string} key
 */
export async function checkNft(store, key) {
  const rsp = await got
    .get('https://nft-storage-dev.protocol-labs.workers.dev/internal/list2', {
      searchParams: {
        key,
      },
    })
    .json()
  if (rsp.ok) {
    await store.put(key, {
      data: rsp.nft,
      pinStatus: rsp.pin.status,
      size: rsp.pin.size,
    })
  } else {
    console.log(rsp.error)
  }
}
