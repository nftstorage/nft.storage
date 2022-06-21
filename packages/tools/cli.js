#!/usr/bin/env node

import sade from 'sade'
import Cloudflare from './utils/cloudflare.js'
import got from 'got'

const cli = sade('nft-cli')

cli.version('1.0.0')

cli
  .command('dns', 'Upsert Cloudflare DNS records')
  .option('--token', 'Cloudflare Token')
  .option('--zone', 'Cloudflare Zone')
  .option('--name', 'Record name')
  .option('--content', 'Record content ie. "subdomain.domain.com')
  .option('--type', 'Record type', 'CNAME')
  .option('--ttl', 'Record TTL', 1)
  .option('--proxied', 'Record should be proxied ?', true)
  .action(async (/** @type {import('./types').UpsertRecordOptions} */ opts) => {
    try {
      const cf = new Cloudflare({ token: opts.token })
      await cf.upsertDns(opts.zone, opts)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

cli
  .command('heartbeat', 'Ping opsgenie heartbeat')
  .option('--token', 'Opsgenie Token')
  .option('--name', 'Heartbeat Name')
  .action(async (opts) => {
    try {
      await got(`https://api.opsgenie.com/v2/heartbeats/${opts.name}/ping`, {
        headers: {
          Authorization: `GenieKey ${opts.token}`,
        },
      })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

cli.parse(process.argv)
