import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'
import PQueue from 'p-queue'

/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('./schema').LocalNFT} LocalNFT
 */

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function checkStatus(ctx, task) {
  let count = 0
  let missing = 0
  const errors = []
  const queue = new PQueue({
    concurrency: 20,
    interval: 1000,
    intervalCap: 200,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. count: ${count} new: ${missing} errors: ${errors.length}`
  })

  for await (const { key, value } of ctx.nftStore.iterator()) {
    count++
    const cid = parseCID(key)
    if (!value.checked && value.pinStatus !== 'pinned') {
      missing++
      const run = async () => {
        try {
          const status = await ctx.cluster.status(cid)
          if (status.status === 'pinned') {
            const size = await ctx.cluster.size(cid)
            await ctx.nftStore.put(key, {
              size,
              pinStatus: status.status,
              checked: true,
            })
          } else {
            await ctx.nftStore.put(key, {
              size: 0,
              pinStatus: status.status,
              checked: true,
            })
          }
        } catch (err) {
          // console.log(err)
          errors.push(err)
        }
      }
      queue.add(() => run())
    }
  }
  await queue.onIdle()
  task.title += ` count: ${count} new: ${missing} errors: ${errors.length}`
}

/**
 * Validate local data with AJV and some fixes
 *
 * @param {Context} ctx
 * @param {Task} task
 */
export async function validateLocal(ctx, task) {
  let count = 0
  const validate = validation()

  for await (const item of ctx.nftStore.iterator()) {
    count++
    task.output = `Queue: ${count} - ${item.value.data.cid}`

    const valid = validate(item.value)

    if (!valid) {
      // Fix no scope
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'scope'"
        )
      ) {
        // await ctx.nftStore.put(item.key, { data: { scope: 'nft-storage' } })
      }

      // Fix no deals
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'deals'"
        )
      ) {
        await ctx.nftStore.put(item.key, { deals: [] })
      }

      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'pinStatus'"
        )
      ) {
        // await ctx.nftStore.put(item.key, { pinStatus: status.status })
      }

      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'size'"
        )
      ) {
        // await ctx.nftStore.put(item.key, { size })
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

      const fixed = await ctx.nftStore.get(item.key)
      const fixedValid = validate(fixed)
      if (!fixedValid) {
        console.log(JSON.stringify(fixed, null, 2))

        console.log(validate.errors)
        throw new Error('Still invalid')
      }
    }
  }
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
 * Validation for the LevelDB records
 */
function validation() {
  const ajv = new Ajv()
  ajvFormats(ajv)

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
