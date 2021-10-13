import dotenv from 'dotenv'
import ora from 'ora'
import { getCloudflare, getDBClient, findNs } from './lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)
  const db = getDBClient({ ...process.env, ENV: 'staging' })
  const spinner = ora()

  const namespaces = await cf.fetchKVNamespaces()
  const usersNs = findNs(namespaces, env, 'USERS')
  const nftsNs = findNs(namespaces, env, 'NFTS')

  let userCount = 0
  for await (const userKeys of cf.fetchKVKeys(usersNs.id)) {
    for (const userKey of userKeys) {
      userCount++
      let kvNftCount = 0
      let pgNftCount = 0
      const spinnerText = () =>
        `${userCount} ${userKey.name} KV NFTs: ${kvNftCount}, PG NFTs: ${pgNftCount}`
      spinner.start(spinnerText())

      const { data: user, error: userError } = await db.getUser(userKey.name)
      if (userError) {
        spinner.stopAndPersist()
        spinner.fail(
          `Error fetching user from DB\n${JSON.stringify(userError, null, 2)}`
        )
        continue
      }
      if (!user) {
        spinner.stopAndPersist()
        spinner.fail(`Missing user: ${userKey.name}`)
        continue
      }
      const { count, error: countError } = await db.client
        .from('upload')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .range(0, 1)
      if (countError) {
        spinner.stopAndPersist()
        spinner.fail(
          `Error counting uploads from DB\n${JSON.stringify(
            countError,
            null,
            2
          )}`
        )
        continue
      }
      pgNftCount = count
      spinner.text = spinnerText()

      if (user.magic_link_id !== user.github_id) {
        for await (const nftKeys of cf.fetchKVKeys(nftsNs.id, {
          prefix: `${user.magic_link_id}:`,
        })) {
          kvNftCount += nftKeys.length
          spinner.text = spinnerText()
        }
        for await (const nftKeys of cf.fetchKVKeys(nftsNs.id, {
          prefix: `${user.github_id}:`,
        })) {
          kvNftCount += nftKeys.length
          spinner.text = spinnerText()
        }
      } else {
        for await (const nftKeys of cf.fetchKVKeys(nftsNs.id, {
          prefix: `${user.magic_link_id}:`,
        })) {
          kvNftCount += nftKeys.length
          spinner.text = spinnerText()
        }
      }

      if (kvNftCount === pgNftCount) {
        spinner.succeed()
      } else {
        spinner.fail()
      }
    }
  }
}

dotenv.config()
main().catch(console.error)
