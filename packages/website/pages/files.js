import { API, getNfts, getToken } from '../lib/api.js'
import { useQuery, useQueryClient } from 'react-query'

import Button from '../components/button.js'
import Loading from '../components/loading'
import { NFTStorage } from 'nft.storage'
import Script from 'next/script'
import { When } from 'react-if'
import bytes from 'bytes'
import countly from '../lib/countly.js'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * Static Props
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Files - NFT Storage',
      navBgColor: 'bg-nsyellow',
      redirectTo: '/',
      needsUser: true,
    },
  }
}

/**
 * Files Page
 *
 * @param {import('../components/types.js').LayoutChildrenProps} props
 * @returns
 */
export default function Files({ user }) {
  const router = useRouter()
  const version = /** @type {string} */ (router.query.version)
  const [deleting, setDeleting] = useState('')
  const [limit] = useState(25)
  const [befores, setBefores] = useState([''])
  const queryClient = useQueryClient()
  const queryParams = { before: befores[0], limit }
  /** @type {[string, { before: string, limit: number }]} */
  const queryKey = ['get-nfts', queryParams]

  const { status, data } = useQuery(
    queryKey,
    (ctx) => getNfts(ctx.queryKey[1], version),
    {
      enabled: !!user,
    }
  )

  /** @type {any[]} */
  const nfts = data || []

  /**
   * @param {import('react').ChangeEvent<HTMLFormElement>} e
   */
  async function handleDeleteFile(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const cid = data.get('cid')
    if (cid && typeof cid === 'string') {
      if (!confirm('Are you sure? Deleted files cannot be recovered!')) {
        return
      }
      setDeleting(cid)
      try {
        const client = new NFTStorage({
          token: await getToken(),
          endpoint: new URL(API + (version ? `/v${version}/` : '/')),
        })
        await client.delete(cid)
      } finally {
        await queryClient.invalidateQueries('get-nfts')
        setDeleting('')
      }
    }
  }

  function handlePrevClick() {
    if (befores.length === 1) return
    setBefores(befores.slice(1))
  }

  function handleNextClick() {
    if (nfts.length === 0) return
    setBefores([nfts[nfts.length - 1].created, ...befores])
  }

  function handleFirstClick() {
    setBefores([''])
  }

  const hasZeroNfts = nfts.length === 0 && befores.length === 1

  return (
    <>
      <Script src="//embed.typeform.com/next/embed.js" />
      <main className="bg-nsyellow">
        <div className="flex justify-center pt4">
          <Button data-tf-popup="OTxv3w2O" className="mh3 mb3" variant="dark">
            {'Tell us how we are doing'}
          </Button>
        </div>
        <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
          <When condition={status === 'loading'}>
            <Loading />
          </When>
          <When condition={status !== 'loading'}>
            <>
              <div className="flex items-center mb3">
                <h1 className="flex-auto chicagoflf mv4">Files</h1>
                <Button
                  href={{
                    pathname: '/new-file',
                    query: version ? { version } : null,
                  }}
                  className="flex-none"
                  id="upload"
                  tracking={{
                    ui: countly.ui.FILES,
                    action: 'Upload File',
                  }}
                >
                  + Upload
                </Button>
              </div>
              <div className="table-responsive">
                <When condition={hasZeroNfts}>
                  <p className="tc mv5">
                    <span className="f1 dib mb3">😢</span>
                    <br />
                    No files
                  </p>
                </When>
                <When condition={!hasZeroNfts}>
                  <>
                    <table className="w-100 collapse">
                      <thead>
                        <tr className="bg-nsgray">
                          <th className="">Date</th>
                          <th className="">CID</th>
                          <th className="">Size</th>
                          <th className="">
                            <span className="sr-only">File Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nfts.map(
                          (/** @type {any} */ nft, /** @type {number} */ i) => (
                            <tr className="bg-white bb" key={`nft-${i}`}>
                              <td
                                data-label="Date"
                                className=""
                                title={nft.created}
                              >
                                {nft.created.split('T')[0]}
                              </td>
                              <td data-label="CID" className="wrap-cell">
                                <GatewayLink cid={nft.cid} type={nft.type} />
                              </td>
                              <td data-label="Size" className="">
                                {bytes(nft.size || 0)}
                              </td>
                              <td className="shrink-cell center-cell">
                                <form onSubmit={handleDeleteFile}>
                                  <input
                                    type="hidden"
                                    name="cid"
                                    value={nft.cid}
                                  />
                                  <Button
                                    type="submit"
                                    disabled={Boolean(deleting)}
                                    variant={'caution'}
                                    id="delete-nft"
                                    tracking={{
                                      event: countly.events.FILE_DELETE_CLICK,
                                      ui: countly.ui.FILES,
                                      action: 'Delete File',
                                    }}
                                  >
                                    {deleting === nft.cid
                                      ? 'Deleting...'
                                      : 'Delete'}
                                  </Button>
                                </form>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <div className="flex flex-wrap justify-center tc mv3">
                      <Button
                        className="mh2 mb2"
                        disabled={befores.length === 1}
                        onClick={handleFirstClick}
                        id="files-first"
                        tracking={{
                          event: countly.events.FILES_NAVIGATION_CLICK,
                          ui: countly.ui.FILES,
                          action: 'First',
                        }}
                      >
                        ⇤ First
                      </Button>
                      <Button
                        className="mh2 mb2"
                        disabled={befores.length === 1}
                        onClick={handlePrevClick}
                        id="files-previous"
                        tracking={{
                          event: countly.events.FILES_NAVIGATION_CLICK,
                          ui: countly.ui.FILES,
                          action: 'Previous',
                        }}
                      >
                        ← Previous
                      </Button>
                      <Button
                        className="mh2 mb2"
                        disabled={nfts.length < limit}
                        onClick={handleNextClick}
                        id="files-next"
                        tracking={{
                          event: countly.events.FILES_NAVIGATION_CLICK,
                          ui: countly.ui.FILES,
                          action: 'Next',
                        }}
                      >
                        Next →
                      </Button>
                    </div>
                  </>
                </When>
              </div>
            </>
          </When>
        </div>
      </main>
    </>
  )
}

/**
 * Gateway Link Component
 *
 * @param {{cid: string, type?: string}} props
 */
function GatewayLink({ cid, type }) {
  const gatewayLink = cid.startsWith('Qm')
    ? `https://ipfs.io/ipfs/${cid}`
    : `https://${cid}.ipfs.dweb.link`
  const href = type === 'nft' ? `${gatewayLink}/metadata.json` : gatewayLink

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="black">
      {cid}
    </a>
  )
}
