import { activate, deactivate } from './mock-server.js'
import { init, handle } from './service.js'
import { spawn } from 'child_process'

const main = async () => {
  const [, , command, ...args] = process.argv
  const AUTH_TOKEN = Math.random().toString(32).slice(2)
  const CID = `bafyreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi`
  const pieceCid =
    'bagayreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
  const created = new Date()

  const service = await activate(
    init(
      AUTH_TOKEN,
      new Map([
        [
          `${AUTH_TOKEN}:${CID}`,
          {
            cid: CID,
            deals: [
              {
                lastChanged: '2021-03-18T11:46:50.000Z',
                status: 'queued',
              },
              {
                batchRootCid: CID,
                lastChanged: '2021-03-18T11:46:50.000Z',
                miner: 't01234',
                network: 'nerpanet',
                pieceCid,
                status: 'proposing',
              },
              {
                batchRootCid: CID,
                lastChanged: '2021-03-18T11:46:50.000Z',
                miner: 'f05678',
                network: 'mainnet',
                pieceCid,
                status: 'accepted',
              },
              {
                batchRootCid: CID,
                lastChanged: '2021-03-18T11:46:50.000Z',
                miner: 'f09999',
                network: 'mainnet',
                pieceCid,
                status: 'failed',
                statusText: 'miner rejected my stuffz',
              },
              {
                batchRootCid: CID,
                chainDealID: 24526235,
                dealActivation: '2021-03-18T11:46:50.000Z',
                dealExpiration: '2021-03-18T11:46:50.000Z',
                lastChanged: '2021-03-18T11:46:50.000Z',
                miner: 'f34523',
                network: 'mainnet',
                pieceCid,
                status: 'active',
              },
            ],
            pin: {
              cid: CID,
              status: 'pinned',
              created: created.toString(),
            },
            created: created.toString(),
          },
        ],
      ])
    ),
    handle
  )

  console.log(`Mock service running on: ${service.url}`)

  const test = spawn(`${command}`, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      AUTH_TOKEN,
      SERVICE_ENDPOINT: `${service.url}`,
    },
  })

  const code = await new Promise((resolve) =>
    test.once('exit', (code) => resolve(code))
  )

  deactivate(service)
  process.exit(code)
}

main()
