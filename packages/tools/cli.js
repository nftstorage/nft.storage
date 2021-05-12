#!/usr/bin/env node

const sade = require('sade')
const CF = require('cloudflare')
const { Octokit } = require('@octokit/rest')
const getUrls = require('get-urls')

/**
 * Upset Record
 *
 * @param {import('./types').UpsertRecordOptions} opts
 */
async function upsertRecord(opts) {
  const cf = new CF({ token: opts.token })
  // @ts-ignore - cf browser output doesnt have a proper type
  const { result } = await cf.dnsRecords.browse(opts.zone)
  const target = result.find(
    (/** @type {{ name: string; type: string; }} */ x) =>
      x.name === opts.name && x.type === opts.type
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
      priority: 1,
    })
  }
}

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
    await upsertRecord(opts)
  })

cli
  .command(
    'deploy-website',
    'Update dns record with latest Cloudflare Pages production deployment.'
  )
  .option('--token', 'Cloudflare Token')
  .option('--zone', 'Cloudflare Zone')
  .option('--name', 'Record name', 'nft.storage')
  .option('--type', 'Record type', 'CNAME')
  .option('--ttl', 'Record TTL', 1)
  .option('--proxied', 'Record should be proxied ?', true)
  .action(
    async (/** @type {import('./types').DeployWebsiteOptions} */ opts) => {
      const gh = new Octokit()
      const { data } = await gh.checks.listForRef({
        owner: 'ipfs-shipyard',
        repo: 'nft.storage',
        ref: 'main',
        check_name: 'Cloudflare Pages',
        status: 'completed',
      })
      const conclusion = data.check_runs[0].conclusion
      if (conclusion === 'success') {
        const url = [...getUrls(data.check_runs[0].output.summary)][0]
        if (url.endsWith('nft-storage.pages.dev')) {
          console.log(url)
          await upsertRecord({
            token: opts.token,
            zone: opts.zone,
            name: opts.name,
            type: opts.type,
            ttl: opts.ttl,
            proxied: opts.proxied,
            content: url.replace('https://', ''),
          })
        } else {
          throw new Error(
            `URL is invalid "${url}" should end with  nft-storage.pages.dev`
          )
        }
      } else {
        throw new Error(`Latest Cloudflare production deployment failed, check the links below:

${data.check_runs[0].html_url}
${data.check_runs[0].details_url}

`)
      }
    }
  )

cli.parse(process.argv)
