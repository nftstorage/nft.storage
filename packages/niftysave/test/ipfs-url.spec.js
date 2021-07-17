import { describe, it } from 'mocha'
import assert from 'assert'
import * as IPFSURL from '../src/ipfs-url.js'
import { CID } from 'multiformats'

describe('IPFSURL', () => {
  describe('asIPFSURL', () => {
    /** @type {Array<[string, string|null]>} */
    const input = [
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link',
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/',
      ],
      [
        // invalid cid
        'https://dafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link',
        null,
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/path/to/file',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/path/to/file',
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/file',
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/file',
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/dir/',
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/dir/',
      ],
      [
        // no .ipfs. found
        'http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link',
        null,
      ],
      [
        'http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm?arg=val#hash',
        'ipfs://bafybeietxxlx6s63ylb5onegedey7vm22a7xnfralfepjg2ddz7pvnroki/?arg=val#hash',
      ],
      [
        'http://ipfs.alexandria.media/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html?arg=val#hash',
        'ipfs://bafybeihqmddtpzb34347vq4xb2xnwk44n7dpdacrrbruy7urzbxnnphc4e/content/index.html?arg=val#hash',
      ],
      ['http://ipfs.io/ipns/github.com/', null],
      ['https://github.com/ipfs/js-ipfs/blob/master/README.md', null],
      ['https://google.com', null],
      [
        'http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm',
        'ipfs://bafybeietxxlx6s63ylb5onegedey7vm22a7xnfralfepjg2ddz7pvnroki/',
      ],
      [
        'https://dafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o#1',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/#1',
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o?a=1&a=2',
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/?a=1&a=2',
      ],
    ]

    for (const [source, expect] of input) {
      it(`${source} -> ${expect}`, () => {
        const actual = IPFSURL.asIPFSURL(new URL(source))
        assert.strictEqual(actual ? actual.href : actual, expect)
      })
    }
  })

  describe.only('parseGateWayURL', () => {
    /** @type {Array<[string, {cid:CID, pathname:string, hash:string, search: string}|null]>} */
    const input = [
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/',
          hash: '',
          search: '',
        },
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/',
          hash: '',
          search: '',
        },
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link',
        {
          cid: CID.parse(
            'bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va'
          ),
          pathname: '/',
          hash: '',
          search: '',
        },
      ],
      [
        // invalid cid
        'https://dafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link',
        null,
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/path/to/file',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/path/to/file',
          hash: '',
          search: '',
        },
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/file',
        {
          cid: CID.parse(
            'bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va'
          ),
          pathname: '/file',
          hash: '',
          search: '',
        },
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/dir/',
        {
          cid: CID.parse(
            'bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va'
          ),
          pathname: '/dir/',
          hash: '',
          search: '',
        },
      ],
      [
        // no .ipfs. found
        'http://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.dweb.link',
        null,
      ],
      [
        'http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm?arg=val#hash',
        {
          cid: CID.parse('QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm'),
          pathname: '/',
          hash: '#hash',
          search: '?arg=val',
        },
      ],
      [
        'http://ipfs.alexandria.media/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html?arg=val#hash',
        {
          cid: CID.parse('QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU'),
          pathname: '/content/index.html',
          hash: '#hash',
          search: '?arg=val',
        },
      ],
      ['http://ipfs.io/ipns/github.com/', null],
      ['https://github.com/ipfs/js-ipfs/blob/master/README.md', null],
      ['https://google.com', null],
      [
        'http://ipfs.io/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm',
        {
          cid: CID.parse('QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm'),
          pathname: '/',
          hash: '',
          search: '',
        },
      ],
      [
        'https://dafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/',
          hash: '',
          search: '',
        },
      ],
      [
        'https://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va.ipfs.dweb.link/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
        {
          cid: CID.parse(
            'bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va'
          ),
          pathname: '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o',
          hash: '',
          search: '',
        },
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o#1',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/',
          hash: '#1',
          search: '',
        },
      ],
      [
        'https://ipfs.io/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o?a=1&a=2',
        {
          cid: CID.parse('QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o'),
          pathname: '/',
          hash: '',
          search: '?a=1&a=2',
        },
      ],
    ]

    for (const [source, expect] of input) {
      it(`${source} -> ${expect}`, () => {
        const actual = IPFSURL.parseGateWayURL(new URL(source))
        assert.deepStrictEqual(actual, expect)
      })
    }
  })

  describe('formatIPFSPath', () => {
    /** @type {Array<[string, string|null]>} */
    const input = [
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
        '/ipfs/bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/',
        '/ipfs/bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/',
      ],

      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/path/to/file',
        '/ipfs/bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/path/to/file',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/file',
        '/ipfs/bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/file',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/dir/',
        '/ipfs/bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/dir/',
      ],

      [
        'ipfs://bafybeietxxlx6s63ylb5onegedey7vm22a7xnfralfepjg2ddz7pvnroki/?arg=val#hash',
        '/ipfs/bafybeietxxlx6s63ylb5onegedey7vm22a7xnfralfepjg2ddz7pvnroki/',
      ],
      [
        'ipfs://bafybeihqmddtpzb34347vq4xb2xnwk44n7dpdacrrbruy7urzbxnnphc4e/content/index.html?arg=val#hash',
        '/ipfs/bafybeihqmddtpzb34347vq4xb2xnwk44n7dpdacrrbruy7urzbxnnphc4e/content/index.html',
      ],
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/#1',
        '/ipfs/bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/?a=1&a=2',
        '/ipfs/bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
      ],
    ]

    for (const [source, expect] of input) {
      it(`${source} -> ${expect}`, () => {
        const actual = IPFSURL.formatIPFSPath(
          /** @type {IPFSURL.IPFSURL} */ (new URL(source))
        )
        assert.strictEqual(actual, expect)
      })
    }
  })

  describe('formatIPFSPathWithCIDv0', () => {
    /** @type {Array<[string, string|null]>} */
    const input = [
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/',
        '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/',
        '/ipfs/QmYvJuJzVYrxR3JhLYgp7qehhKXMnjqDQs51xYiqJjAgqd/',
      ],

      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/path/to/file',
        '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/path/to/file',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/file',
        '/ipfs/QmYvJuJzVYrxR3JhLYgp7qehhKXMnjqDQs51xYiqJjAgqd/file',
      ],
      [
        'ipfs://bafybeie5gq4jxvzmsym6hjlwxej4rwdoxt7wadqvmmwbqi7r27fclha2va/dir/',
        '/ipfs/QmYvJuJzVYrxR3JhLYgp7qehhKXMnjqDQs51xYiqJjAgqd/dir/',
      ],

      [
        'ipfs://bafybeietxxlx6s63ylb5onegedey7vm22a7xnfralfepjg2ddz7pvnroki/?arg=val#hash',
        '/ipfs/QmYHNYAaYK5hm3ZhZFx5W9H6xydKDGimjdgJMrMSdnctEm/',
      ],
      [
        'ipfs://bafybeihqmddtpzb34347vq4xb2xnwk44n7dpdacrrbruy7urzbxnnphc4e/content/index.html?arg=val#hash',
        '/ipfs/QmeWz9YZEeNFXQhHg4PnR5ZiNr5isttgi5n1tc1eD5EfGU/content/index.html',
      ],
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/#1',
        '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/',
      ],
      [
        'ipfs://bafybeie2reiz2q6rbcuwpy2etyztjnceolu4rdi7rp3th2lsky4r5ckeey/?a=1&a=2',
        '/ipfs/QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o/',
      ],
    ]

    for (const [source, expect] of input) {
      it(`${source} -> ${expect}`, () => {
        const actual = IPFSURL.formatIPFSPathWithCIDv0(
          /** @type {IPFSURL.IPFSURL} */ (new URL(source))
        )
        assert.strictEqual(actual, expect)
      })
    }
  })
})
