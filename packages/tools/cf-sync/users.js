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
export async function syncUsers(ctx, task) {
  let count = 0

  for await (const user of ctx.cf.kvPaginate({
    accountId: ctx.cfAccount,
    kvId: ctx.kvUser,
  })) {
    count++
    await ctx.userStore.put(user.name, {})
    task.output = `count: ${count}`
  }

  task.title += ` count: ${count}`
}

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function syncUsersData(ctx, task) {
  let count = 0
  /** @type {string[]} */
  const errors = []
  const queue = new PQueue({
    concurrency: 100,
    interval: 1000,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. count: ${count} errors: ${errors.length}`
  })

  for await (const { key } of ctx.userStore.iterator()) {
    count++

    const run = async () => {
      try {
        const rsp = await got
          .get(
            'https://nft-storage-migration.protocol-labs.workers.dev/internal/user',
            {
              searchParams: {
                key,
              },
            }
          )
          .json()
        if (rsp.ok) {
          await ctx.userStore.put(key, { data: rsp.user })
        } else {
          errors.push(JSON.stringify(rsp.error))
        }
      } catch (err) {
        console.log(key)
        console.log('🚀 ~ file: users.js ~ line 67 ~ run ~ err', err)
      }
    }
    queue.add(() => run())
  }
  await queue.onIdle()
  if (errors.length > 0) {
    console.error(errors.join('\n'))
  }
  task.title += ` count: ${count} errors: ${errors.length}`
}
