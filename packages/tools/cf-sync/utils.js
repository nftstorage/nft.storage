const got = require('got').default
const PQueue = require('p-queue').default
const { get } = require('./cf')
const Ajv = require('ajv').default

/**
 * @typedef {import('./cli').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('./schema').LocalNFT} LocalNFT
 */

/**
 * Sync data from the main KV
 *
 * @param {Context} ctx
 * @param {Task} task
 */
async function syncNFTsData(ctx, task) {
  let countTotal = 0
  let countMissingData = 0
  const { store, kvNFT } = ctx
  const queue = new PQueue({
    concurrency: 10,
    interval: 300000,
    intervalCap: 1180,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. Total: ${countTotal} New: ${countMissingData}`
  })

  for await (const item of store.iterator()) {
    countTotal++
    if (!item.value.data || !item.value.data.cid) {
      countMissingData++
      const run = async () => {
        try {
          const data = await get(kvNFT, item.key)
          await store.put(item.key, { data })
        } catch (err) {
          // console.log(item.key)
          // console.log(err.message)
        }
      }
      queue.add(() => run())
    }
  }

  await queue.onIdle()
  task.title += ` -> Total: ${countTotal} New: ${countMissingData}`
}

/**
 * Use check endpoint to sync pin status, deals and size
 *
 * @param {Context} ctx
 * @param {Task} task
 */
async function syncCheck(ctx, task) {
  let countTotal = 0
  let countMissingData = 0
  const queue = new PQueue({
    concurrency: 20,
    interval: 1000,
    intervalCap: 200,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size} nfts remaining. Total: ${countTotal} New: ${countMissingData}`
  })

  for await (const item of ctx.store.iterator()) {
    countTotal++
    const { store } = ctx
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
            await store.put(item.key, {
              pinStatus: value.pin.status,
              size: value.pin.size,
              deals: value.deals,
            })
          }
        } catch (err) {
          console.log(cid)
          console.log(err.message)
        }
      }
      queue.add(() => run())
    }
  }

  await queue.onIdle()
  task.title += ` -> Total: ${countTotal} New: ${countMissingData}`
}

/**
 * Validate local data with AJV and some fixes
 *
 * @param {Context} ctx
 * @param {Task} task
 */
async function validateLocal(ctx, task) {
  let count = 0
  const validate = validation()

  for await (const item of ctx.store.iterator()) {
    count++
    task.output = `Queue: ${count}`

    await checkCluster(item, ctx)

    const valid = validate(item.value)

    if (!valid && !isBad) {
      // get everything we need
      const status = await ctx.cluster.status(item.value.data.cid)
      const size = await ctx.cluster.size(item.value.data.cid)

      // Fix no scope
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'scope'"
        )
      ) {
        await ctx.store.put(item.key, { data: { scope: 'nft-storage' } })
      }

      // Fix no deals
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'deals'"
        )
      ) {
        await ctx.store.put(item.key, { deals: [] })
      }

      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'pinStatus'"
        )
      ) {
        await ctx.store.put(item.key, { pinStatus: status.status })
      }

      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'size'"
        )
      ) {
        await ctx.store.put(item.key, { size })
      }

      // Fix uploads with empty files objects
      // console.log(item.value, validate.errors)
      // const files = /** @type {LocalNFT['data']['files']} */ (
      //   item.value.data.files
      // )
      // const newFiles = []
      // if (files && files.some((f) => Object.keys(f).length === 0)) {
      //   for (const file of files) {
      //     if (Object.keys(file).length > 0) {
      //       newFiles.push(file)
      //     }
      //   }
      //   await ctx.store.put(item.key, { data: { files: newFiles } })
      // }
      // Fix uploads with empty data
      // const data = item.value.data
      // if (!data || Object.keys(data).length === 0) {
      //   const cid = parseCID(item.value.name)
      //   const data = {
      //     cid,
      //     created: new Date().toISOString(),
      //     type: 'unknown',
      //     scope: 'nft-storage',
      //     files: [],
      //     pin: {},
      //   }
      //   await ctx.store.put(item.key, { data })
      // }

      const fixed = await ctx.store.get(item.key)
      const fixedValid = validate(fixed)
      if (!fixedValid) {
        console.log(JSON.stringify(fixed, null, 2))

        console.log(validate.errors, size, status)
        throw new Error('Still invalid')
      }
    }
  }
}

/**
 * Check cluster for pin status and size
 *
 * @param {{key: string;value: any;}} item
 * @param {Context} ctx
 */
async function checkCluster(item, ctx) {
  const cid = parseCID(item.key)

  if (!item.value.checked && !isBad(cid) && item.value.pinStatus !== 'pinned') {
    const status = await ctx.cluster.status(cid)
    if (status.status === 'pinned') {
      const size = await ctx.cluster.size(item.value.data.cid)
      await ctx.store.put(item.key, {
        size,
        pinStatus: status.status,
        checked: true,
      })
    } else {
      await ctx.store.put(item.key, {
        size: 0,
        pinStatus: status.status,
        checked: true,
      })
    }
  }
}

module.exports = {
  syncNFTsData,
  syncCheck,
  checkCluster,
  validateLocal,
}

/**
 * Parse CID from nft name
 *
 * @param {string} name
 */
function parseCID(name) {
  const parts = name.split(':')
  return parts[parts.length - 1]
}

/**
 * Bad nfts
 *
 * @param {string} cid
 */
function isBad(cid) {
  return [
    'QmaGVcmqcwBrHPkR7CWeWhf7jesyCSKSYf5sspHj4YXgpe',
    'Qmdvh1Xa8spstyGroksPx7A7NzUpdYtEJsjy9x4kyTM385',
    'QmZcTTdKhZHapWrx1LMmif6hkd28k4UUrBbaYzmT8Erfkg',
    'QmdXgCzsGwkGEJUs5UdUmsjRK3jBHcmSm1fR8HjHaYMw2L',
    'QmRt7gh2qxFyMLZjUtK1D6eN2pdtMPeiPitNZY4ckAhMGd',
    'QmXpR4Ai49CeUhc2WwfvpMkeTe1jEaZFkLv1YaLdBzaY6J',
    'QmVq2q1WBMHBBbQR37BKbiw9wkJThYYzHgLucAikyGYsTf',
    'Qmazo7s2m39dZUySaeBHeVr23WhoKJvHh5gnvwbg8xRAw9',
  ].includes(cid)
}

/**
 * Validation for the LevelDB records
 */
function validation() {
  const ajv = new Ajv()
  require('ajv-formats').default(ajv)

  /** @type {import('ajv').JSONSchemaType<import('./schema').LocalNFT>} */
  const schema = {
    type: 'object',
    required: ['data', 'deals', 'name', 'pinStatus', 'size'],
    properties: {
      name: { type: 'string' },
      size: { type: 'integer', minimum: 0 },
      pinStatus: {
        type: 'string',
        enum: ['failed', 'pinned', 'pinning', 'queued'],
      },
      deals: {
        type: 'array',
        items: {
          type: 'object',
          required: ['lastChanged', 'status'],
          properties: {
            status: {
              type: 'string',
              enum: ['active', 'failed', 'published', 'terminated', 'queued'],
            },
            lastChanged: { type: 'string', format: 'date-time' },
          },
        },
      },
      data: {
        type: 'object',
        required: ['cid', 'created', 'files', 'scope', 'type'],
        properties: {
          cid: { type: 'string' },
          created: { type: 'string' },
          type: { type: 'string' },
          scope: { type: 'string' },
          files: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string' },
                type: { type: 'string', nullable: true },
              },
            },
          },
          pin: {
            type: 'object',
            required: [],
            nullable: true,
            properties: {
              name: { type: 'string', nullable: true },
              meta: { type: 'object', nullable: true, required: [] },
            },
          },
        },
      },
    },
  }

  return ajv.compile(schema)
}
