import { getToken, API } from '../lib/api'
import countly from '../lib/countly.js'
import { useRouter } from 'next/router'
import { NFTStorage } from 'nft.storage'
import { packToBlob } from 'ipfs-car/pack/blob'
import { useQueryClient } from 'react-query'
import { useState } from 'react'
import { When } from 'react-if'
import Box from '../components/box.js'
import Alert from '../components/alert.js'
import Button from '../components/button.js'
import Link from 'next/link'
import Cross from '../icons/cross'

export function getStaticProps() {
  return {
    props: {
      title: 'New NFT - NFT Storage',
      navBgColor: 'bg-nsyellow',
      redirectTo: '/',
      needsUser: true,
    },
  }
}

export default function NewFile() {
  const router = useRouter()
  const version = /** @type {string} */ (router.query.version)
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)
  const [isCar, setIsCar] = useState(false)
  const [percentComplete, setPercentComplete] = useState(0)
  const [error, setError] = useState('')

  /**
   * @param {import('react').ChangeEvent<HTMLInputElement>} e
   */
  function checkCar(e) {
    const file = e.target.files && e.target.files[0]
    if (file && file.name.endsWith('.car')) {
      setIsCar(true)
    } else {
      setIsCar(false)
    }
  }

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleUploadSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const file = data.get('file')
    if (file && file instanceof File) {
      const client = new NFTStorage({
        token: await getToken(),
        endpoint: new URL(API + (version ? `/v${version}/` : '/')),
      })
      setUploading(true)
      setError('')
      try {
        /** @type File|Blob */
        let car
        if (isCar) {
          car = file
        } else {
          ;({ car } = await packToBlob({ input: [file] }))
        }
        let totalBytesSent = 0
        await client.storeCar(car, {
          onStoredChunk: (size) => {
            totalBytesSent += size
            setPercentComplete(Math.round((totalBytesSent / car.size) * 100))
          },
        })

        router.push({ pathname: '/files', query: version ? { version } : null })
        setError('')
      } catch (/** @type any */ err) {
        console.error(err)
        setError(`Error uploading: ${err.message}`)
      } finally {
        await queryClient.invalidateQueries('get-nfts')
        setUploading(false)
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
                onChange={checkCar}
              />
            </div>
            <label>
              <input
                id="is-car"
                name="is-car"
                type="checkbox"
                checked={isCar}
                readOnly
              />
              <span className="ml2">is CAR?</span>
            </label>
            <details className="db mt3 mb4">
              <summary className="i pointer">
                CAR files supported! What is a CAR?
              </summary>
              <p className="pl3 mt3 lh-copy">
                A CAR is a Content Addressed Archive that allows you to
                pre-compute the root CID for your assets. You can pack your
                assets into a CAR with the{' '}
                <a
                  className="black"
                  href="https://github.com/vasco-santos/ipfs-car"
                  target="_blank"
                  rel="noreferrer"
                >
                  <code>ipfs-car</code>
                </a>{' '}
                cli or via{' '}
                <a
                  className="black"
                  href="https://car.ipfs.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://car.ipfs.io
                </a>
                .
              </p>
              <p className="pl3 mt2 lh-copy">
                Give your CAR filename the <code>.car</code> extention, and when
                it&apos;s uploaded to nft.storge your asset will be stored with
                the exact same root CID as defined in the CAR file.
              </p>
            </details>
            <div className="mv3">
              <Button
                className="bg-nslime"
                type="submit"
                disabled={uploading}
                id="upload-file"
                tracking={{
                  event: countly.events.FILE_UPLOAD_CLICK,
                  ui: countly.ui.NEW_FILE,
                }}
              >
                {uploading
                  ? `Uploading...${
                      percentComplete ? `(${percentComplete}%)` : ''
                    }`
                  : 'Upload'}
              </Button>
            </div>
            <div>
              <p className="lh-copy f7">
                You can also upload files using the{' '}
                <Link href="/#js-client-library">
                  <a className="black">JS Client Library</a>
                </Link>{' '}
                or{' '}
                <Link href="/#raw-http-request">
                  <a className="black">Raw HTTP Requests</a>
                </Link>
              </p>
            </div>
          </form>
        </Box>
        <When condition={error !== ''}>
          <Alert className="pa4 white" position="top" type="error">
            <>
              {error}{' '}
              <button
                className="border ml2 ph2 pv1 br-100 b--transparent pointer"
                onClick={() => setError('')}
              >
                <Cross width="12" height="12" fill="currentColor" />
              </button>
            </>
          </Alert>
        </When>
        <section className="center mw7 pa4">
          <section>
            <h3 className="notification-header">🌍 Public data</h3>
            <p>
              All data uploaded to Nft.Storage is available to anyone who
              requests it using the correct CID. Do not store any private or
              sensitive information in an unencrypted form using Nft.Storage.
            </p>
          </section>
          <section>
            <h3 className="notification-header">♾️ Permanent data</h3>
            <p>
              Deleting files from the Nft.Storage site’s{' '}
              <Link href="/files">
                <a className="black no-underline underline-hover">Files</a>
              </Link>{' '}
              page will remove them from the file listing for your account, but
              that doesn’t prevent nodes on the decentralized storage network
              from retaining copies of the data indefinitely. Do not use
              Nft.Storage for data that may need to be permanently deleted in
              the future.
            </p>
          </section>
        </section>
      </div>
    </main>
  )
}
