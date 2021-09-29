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
  let missing = 0
  const queue = new PQueue({
    concurrency: 10,
    interval: 1000,
    intervalCap: 100,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. count: ${count} new: ${missing}`
  })

  for await (const { key, value } of ctx.nftStore.iterator()) {
    count++
    if (!value.data || !value.data.cid) {
      missing++
      const run = async () => {
        const rsp = await got
          .get(
            'https://nft-storage-dev.protocol-labs.workers.dev/internal/list2',
            {
              searchParams: {
                key,
              },
            }
          )
          .json()
        if (rsp.ok) {
          await ctx.nftStore.put(key, { data: rsp.nft })
        } else {
          console.log(rsp.error)
          // await ctx.nftStore.del(key)
        }
      }
      queue.add(() => run())
    }
  }
  await queue.onIdle()
  task.title += ` nfts ${count} new ${missing}`
}

/**
 * Use check endpoint to sync pin status, deals and size
 *
 * @param {Context} ctx
 * @param {Task} task
 */
export async function syncCheck(ctx, task) {
  let countTotal = 0
  let countMissingData = 0
  const errors = []
  const queue = new PQueue({
    concurrency: 20,
    interval: 1000,
    intervalCap: 200,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size} count: ${countTotal} new: ${countMissingData}`
  })

  for await (const item of ctx.nftStore.iterator()) {
    countTotal++
    const parts = item.key.split(':')
    const cid = parts[parts.length - 1]
    const value = item.value

    if (
      value.pinStatus === undefined ||
      value.deals === undefined ||
      value.size === undefined
    ) {
      countMissingData++
      const run = async () => {
        try {
          const { ok, value } = await got(
            `https://api.nft.storage/check/${cid}`,
            {
              headers: {
                Authorization: `bearer ${ctx.nftStorageToken}`,
              },
            }
          ).json()
          if (ok) {
            await ctx.nftStore.put(item.key, {
              pinStatus: value.pin.status,
              size: value.pin.size,
              deals: value.deals,
            })
          }
        } catch (err) {
          console.log(
            '🚀 ~ file: nft.js ~ line 127 ~ run ~ err',
            err.message,
            item
          )
          errors.push(`${cid}: ${err.message}`)
        }
      }
      queue.add(() => run())
    }
  }

  await queue.onIdle()
  task.title += ` -> Total: ${countTotal} New: ${countMissingData} Errors: ${errors.length}`
}

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function checkDeletes(ctx, task) {
  let count = 0
  let deleted = 0
  const errors = []
  const queue = new PQueue({
    concurrency: 100,
    interval: 5000,
    intervalCap: 1000,
    autoStart: false,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. count: ${count} deleted: ${deleted}`
  })

  for await (const { key, value } of ctx.nftStore.iterator()) {
    count++
    const run = async () => {
      const rsp = await got
        .get(
          'https://nft-storage-dev.protocol-labs.workers.dev/internal/list2',
          {
            searchParams: {
              key,
            },
          }
        )
        .json()
      if (rsp.ok) {
        // console.log(rsp)
        await ctx.nftStore.put(key, {
          data: rsp.nft,
          pinStatus: rsp.pin.status,
          size: rsp.pin.size,
        })
      } else {
        deleted++
        errors.push(rsp.error)
        // console.log(rsp.error)
        await ctx.nftStore.del(key)
      }
    }
    queue.add(() => run())
  }

  await queue.start()
  await queue.onIdle()
  task.title += ` nfts ${count} deleted ${deleted}`
}

// {
//   ok: true,
//   nft: {
//     cid: 'bafkreie6kbyjd4tjda2dct5kemfb5xyhjy3cqmyggpnyrvnilhl7foa7ay',
//     created: '2021-06-08T17:54:20.043Z',
//     type: 'application/octet-stream',
//     scope: 'sky_nft_test',
//     files: []
//   },
//   pin: { status: 'pinned', size: 250 }
// }
