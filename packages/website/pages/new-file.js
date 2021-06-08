import { getToken, API } from '../lib/api'
import { useRouter } from 'next/router'
import { NFTStorage } from 'nft.storage'
import { useQueryClient } from 'react-query'
import { useState } from 'react'
import Box from '../components/box.js'
import Button from '../components/button.js'

export function getStaticProps() {
  return {
    props: {
      title: 'New NFT - NFT Storage',
      navBgColor: 'nsyellow',
      redirectTo: '/',
      needsUser: true,
    },
  }
}

export default function NewFile() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleUploadSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const file = data.get('file')
    const isCar = data.get('is-car') === 'on' ? true : false
    console.log({ isCar })
    if (file && file instanceof File) {
      const client = new NFTStorage({
        token: await getToken(),
        endpoint: new URL(API),
      })
      setUploading(true)
      try {
        await client.storeBlob(file, isCar)
      } finally {
        await queryClient.invalidateQueries('get-nfts')
        setUploading(false)
        router.push('/files')
      }
    }
  }

  return (
    <main className="bg-nsyellow">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        <Box
          bgColor="nsgray"
          borderColor="nspink"
          wrapperClassName="center mv4 mw6"
        >
          <h1 className="chicagoflf f4 fw4">Upload File</h1>
          <form onSubmit={handleUploadSubmit}>
            <div className="mv3">
              <label htmlFor="name" className="dib mb2">
                File:
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="db ba b--black w5 pa2"
                required
              />
            </div>
            <label>
              <input id="is-car" name="is-car" type="checkbox" />
              <span class="ml2">is CAR?</span>
            </label>
            <details class="db mt3 mb4">
              <summary class="i">Tell me more, what is CAR?</summary>
              <p class="pl3 mt2 lh-copy">
                A CAR or Content Addressed Archive allows you to pre-compute the
                root CID for your assets. When uploaded as a CAR, nft.storge
                will store your asset with the same root CID as defined in the
                CAR header. You can pack your assets into a CAR with{' '}
                <a
                  class="black"
                  href="https://github.com/vasco-santos/ipfs-car"
                  target="_blank"
                >
                  <code>ipfs-car</code>
                </a>{' '}
                or via{' '}
                <a
                  class="black"
                  href="https://car.on.fleek.co/"
                  target="_blank"
                >
                  https://car.on.fleek.co
                </a>
              </p>
            </details>
            <div className="mv3">
              <Button
                className="bg-nslime"
                type="submit"
                disabled={uploading}
                id="upload-file"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            <div>
              <p className="lh-copy f7">100MB upload limit per file.</p>
              <p className="lh-copy f7">
                You can also upload files using the{' '}
                <a href="/#js-client" className="black">
                  JS Client Library
                </a>
                ,{' '}
                <a href="/#raw-http-request" className="black">
                  Raw HTTP Requests
                </a>{' '}
                or via the{' '}
                <a
                  href="/#configure-as-a-remote-pinning-service"
                  className="black"
                >
                  Remote Pinning Service API
                </a>
                .
              </p>
            </div>
          </form>
        </Box>
      </div>
    </main>
  )
}
