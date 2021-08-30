#!/usr/bin/env node

const sade = require('sade')
const Cloudflare = require('./utils/cloudflare')
const { itFind: find } = require('./utils/common')

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
  .command(
    'deploy-website',
    'Update DNS record with latest Cloudflare Pages production deployment.'
  )
  .option('--email', 'Cloudflare email')
  .option('--key', 'Cloudflare key')
  .option('--zone', 'Cloudflare Zone')
  .option('--project', 'Cloudflare pages project', 'nft-storage')
  .option('--account', 'Cloudflare account id')
  .option('--name', 'Record name', 'nft.storage')
  .option('--type', 'Record type', 'CNAME')
  .option('--ttl', 'Record TTL', 1)
  .option('--proxied', 'Record should be proxied ?', true)
  .action(
    async (/** @type {import('./types').DeployWebsiteOptions} */ opts) => {
      try {
        const cf = new Cloudflare({ email: opts.email, key: opts.key })
        const deploy = await find(
          cf.deploymentsPaginate({
            accountId: opts.account,
            projectName: opts.project,
            pagination: { per_page: 10 },
          }),
          (/** @type {any} */ i) => {
            const lastRelease =
              i.deployment_trigger.metadata.commit_message.startsWith(
                'chore: release'
              )
            return i.environment === 'production' && !lastRelease
          }
        )
        if (
          deploy.latest_stage.status === 'success' &&
          deploy.latest_stage.name === 'deploy'
        ) {
          await cf.upsertDns(opts.zone, {
            content: deploy.url.replace('https://', ''),
            name: opts.name,
            ttl: opts.ttl,
            type: opts.type,
            proxied: opts.proxied,
          })
          console.log(
            `${opts.name} now points to ${deploy.url.replace('https://', '')}`
          )
        } else {
          throw new Error(`Latest Cloudflare production deployment failed`)
        }
      } catch (err) {
        console.error(err)
        process.exit(1)
      }
    }
  )

cli.parse(process.argv)
