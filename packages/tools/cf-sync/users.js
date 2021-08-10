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
  let missing = 0

  for await (const user of ctx.cf.kvPaginate({
    accountId: ctx.cfAccount,
    kvId: ctx.kvUser,
  })) {
    count++
    if (!(await ctx.userStore.has(user.name))) {
      missing++
      await ctx.userStore.put(user.name, {})
    }
    task.output = `count: ${count} new: ${missing}`
  }

  task.title += ` count: ${count} new: ${missing}`
}

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function syncUsersData(ctx, task) {
  let count = 0
  let missing = 0
  const queue = new PQueue({
    concurrency: 10,
    interval: 300000,
    intervalCap: 1180,
  })

  queue.on('active', () => {
    task.output = `Queue: ${queue.size}. count: ${count} new: ${missing}`
  })

  for await (const { key, value } of ctx.userStore.iterator()) {
    count++
    if (!value.data) {
      missing++
      const run = async () => {
        try {
          const data = await ctx.cf.kvValue({
            accountId: ctx.cfAccount,
            kvId: ctx.kvUser,
            key,
          })
          await ctx.userStore.put(key, { data })
        } catch (err) {
          console.log(key)
          console.log(err.message)
        }
      }
      queue.add(() => run())
    }
  }
  await queue.onIdle()
  task.title += ` count: ${count} new: ${missing}`
}
