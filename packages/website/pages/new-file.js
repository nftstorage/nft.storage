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
import Link from '../components/link'
import Cross from '../icons/cross'
import Tooltip from '../components/tooltip.js'

export function getStaticProps() {
  return {
    props: {
      title: 'New NFT - NFT Storage',
      navBgColor: 'bg-nsyellow',
      redirectTo: '/files',
      needsUser: true,
    },
  }
}

/**
 * @typedef {Object} NewFileProps
 * @prop {import('components/types').User} user
 */

/**
 * @param {NewFileProps} props
 */
export default function NewFile({ user }) {
  const router = useRouter()
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
        endpoint: new URL(API + '/'),
      })
      setUploading(true)
      setError('')
      try {
        /** @type File|Blob */
        let car
        if (isCar) {
          car = file
        } else {
          ;({ car } = await packToBlob({
            input: [file],
            wrapWithDirectory: false,
          }))
        }
        let totalBytesSent = 0
        await client.storeCar(car, {
          onStoredChunk: (size) => {
            totalBytesSent += size
            setPercentComplete(Math.round((totalBytesSent / car.size) * 100))
          },
        })

        router.push({ pathname: '/files' })
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

  const UploadFileButton = () => (
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
        ? `Uploading...${percentComplete ? `(${percentComplete}%)` : ''}`
        : 'Upload'}
    </Button>
  )

  return (
    <main className="bg-nsyellow grow">
      <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
        <Box
          bgColor="nsgray"
          borderColor="nspink"
          wrapperClassName="max-w-3xl my-4 mx-auto"
        >
          <h1 className="chicagoflf text-xl font-normal">Upload File</h1>
          <form onSubmit={handleUploadSubmit}>
            <div className="my-4">
              <label htmlFor="name" className="inline-block mb-2">
                File:
              </label>
              <input
                id="file"
                name="file"
                type="file"
                className="block border border-solid border-black w-64 p-2"
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
              <span className="ml-2">is CAR?</span>
            </label>
            <details className="block mt-4 mb-8">
              <summary className="i cursor-pointer">
                CAR files supported! What is a CAR?
              </summary>
              <p className="pl-4 mt-4 leading-normal">
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
                CLI or via{' '}
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
              <p className="pl-4 mt-2 leading-normal">
                Give your CAR filename the <code>.car</code> extention, and when
                it&apos;s uploaded to NFT.Storage your asset will be stored with
                the exact same root CID as defined in the CAR file.
              </p>
            </details>
            <div className="my-4">
              {user.tags.HasAccountRestriction ? (
                <Tooltip
                  id="blocked-upload-file-booltip"
                  placement="left"
                  overlay={
                    <span style={{ width: 160 }}>
                      You are unable to upload files when your account is
                      blocked. Please contact support@nft.storage
                    </span>
                  }
                >
                  <span style={{ paddingLeft: 10 }}>
                    <UploadFileButton />
                  </span>
                </Tooltip>
              ) : (
                <UploadFileButton />
              )}
            </div>
            <div>
              <p className="leading-normal text-xs">
                You can also upload files using the{' '}
                <Link href="/docs/client/js/" className="black">
                  JS Client Library
                </Link>{' '}
                or{' '}
                <Link href="https://nft.storage/api-docs/" className="black">
                  Raw HTTP Requests
                </Link>
              </p>
            </div>
          </form>
        </Box>
        <When condition={error !== ''}>
          <Alert className="p-8 text-white" position="top" type="error">
            <>
              {error}{' '}
              <button
                className="border ml-2 px-2 py-1 br-100 b--transparent cursor-pointer"
                onClick={() => setError('')}
              >
                <Cross width="12" height="12" fill="currentColor" />
              </button>
            </>
          </Alert>
        </When>
        <section className="mx-auto max-w-3xl p-6">
          <section>
            <h3 className="notification-header">🌍 Public data</h3>
            <p className="my-2 text-sm">
              All data uploaded to NFT.Storage is available to anyone who
              requests it using the correct CID. Do not store any private or
              sensitive information in an unencrypted form using NFT.Storage.
            </p>
          </section>
          <section>
            <h3 className="notification-header mt-4">♾️ Permanent data</h3>
            <p className="my-2 text-sm">
              Deleting files from the NFT.Storage site’s{' '}
              <Link
                href="/files"
                className="black no-underline underline-hover"
              >
                Files
              </Link>{' '}
              page will remove them from the file listing for your account, but
              that doesn’t prevent nodes on the decentralized storage network
              from retaining copies of the data indefinitely. Do not use
              NFT.Storage for data that may need to be permanently deleted in
              the future.
            </p>
          </section>
        </section>
      </div>
    </main>
  )
}
