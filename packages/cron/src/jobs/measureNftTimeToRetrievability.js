import { tmpdir } from 'os'
import * as path from 'path'
import { mkdtemp, writeFile } from 'node:fs/promises'
import * as assert from 'assert'
import mime from 'mime-types'
import fetch from '@web-std/fetch'

const FILENAME_TO_UPLOAD = 'to-upload'

/**
 * Download an image to the directory and return path to the file
 * @param {string} targetDir - path to fs dir to download to
 */
const downloadRandomImageToUpload = async (targetDir) => {
  const { target: file } = await downloadFile(
    new URL(
      'https://bafybeiarmhq3d7msony7zfq67gmn46syuv6jrc6dagob2wflunxiyaksj4.ipfs.dweb.link/1681.png'
    ),
    ({ ext }) => path.join(targetDir, `${FILENAME_TO_UPLOAD}.${ext}`)
  )
  return file
}

/**
 * Job that tests/measures steps
 * * prepare a sample image
 * * upload to nft.storage
 * * retrieve image through ipfs gateway
 * @param {object} config
 * @param {string} [config.url] - URL to nft.storage to measure
 */
export async function measureNftTimeToRetrievability(config = {}) {
  console.log('start measureNftTimeToRetrievability', config)
  const dir = await createRandomDir()
  const file = await downloadRandomImageToUpload(dir)
  console.log({ dir, upload: { source: file } })
}

/**
 * Create a new dir on the fs that can be used to test in
 * @returns fs path to dir
 */
async function createRandomDir() {
  const randomDir = await mkdtemp(`${tmpdir()}${path.sep}nft-ttr-`)
  return randomDir
}

/**
 * Download a file from a source url to the filesystem
 * @param {URL} source
 * @param {(o: { ext: string }) => string} createTargetPath
 */
async function downloadFile(source, createTargetPath) {
  const response = await fetch(source.toString(), {
    headers: {
      accept: 'image/*',
    },
  })
  assert.ok(response.body)
  const ct = response.headers.get('content-type')
  assert.ok(ct, 'unable to determine response content-type')
  const ext = mime.extension(ct)
  assert.ok(ext, 'unable to determine file extension from mimetype')
  const target = createTargetPath({ ext })
  writeFile(target, response.body)
  return { target }
}
