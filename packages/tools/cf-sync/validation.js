import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'
import { CID } from 'multiformats'
import { checkNft } from './nft.js'

/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('./schema').LocalNFT} LocalNFT
 */

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
    task.output = `Queue: ${count}`

    const valid = validate(item.value)

    if (!valid) {
      // nft with no data prop re-check with api
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'data'"
        )
      ) {
        await checkNft(ctx.nftStore, item.key)
      }

      // nft.data.files array with empty objects
      if (
        validate.errors?.some(
          (err) => err.message === "must have required property 'name'"
        )
      ) {
        const files = item.value.data.files
        const newfiles = []
        for (const f of files) {
          if (f.name) {
            newfiles.push(f)
          }
        }

        await ctx.nftStore.put(item.key, { data: { files: newfiles } })
      }

      const fixed = await ctx.nftStore.get(item.key)
      const fixedValid = validate(fixed)
      if (!fixedValid) {
        console.log(item.key, JSON.stringify(fixed, null, 2))

        console.log(validate.errors)
        throw new Error('Still invalid')
      }
    }
  }
}

/**
 * Validation for the LevelDB records
 */
function validation() {
  const ajv = new Ajv()
  ajvFormats(ajv)

  ajv.addFormat('cid', {
    type: 'string',
    validate: (/** @type {string} */ data) => {
      try {
        CID.parse(data)
        return true
      } catch (err) {
        return false
      }
    },
  })

  /** @type {import('ajv').JSONSchemaType<import('./schema').LocalNFT>} */
  const schema = {
    type: 'object',
    required: ['data', 'pinStatus', 'size'],
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
          cid: { type: 'string', format: 'cid' },
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
