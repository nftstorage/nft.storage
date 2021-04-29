#!/usr/bin/env node

const sade = require('sade')
const CF = require('cloudflare')

const cli = sade('dns-cli', true)

cli
  .version('1.0.0')
  .option('--token', 'Cloudflare Token')
  .option('--zone', 'Cloudflare Zone')
  .option('--name', 'Record name')
  .option('--content', 'Record content ie. "subdomain.domain.com')
  .option('--type', 'Record type', 'CNAME')
  .option('--ttl', 'Record TTL', 1)
  .option('--proxied', 'Record should proxied ?', true)
  .action(async (opts) => {
    const cf = new CF({ token: opts.token })
    try {
      const { result } = await cf.dnsRecords.browse(opts.zone)
      const target = result.find(
        (x) => x.name === opts.name && x.type === opts.type
      )
      if (target) {
        await cf.dnsRecords.edit(opts.zone, target.id, {
          content: opts.content,
          name: opts.name,
          ttl: opts.ttl,
          proxied: opts.proxied,
          type: opts.type,
        })
      } else {
        await cf.dnsRecords.add(opts.zone, {
          content: opts.content,
          name: opts.name,
          ttl: opts.ttl,
          proxied: opts.proxied,
          type: opts.type,
        })
      }
    } catch (err) {
      console.error(err)
    }
  })
  .parse(process.argv)
