import { API, getNfts, getToken } from '../lib/api.js'
import { useQuery, useQueryClient } from 'react-query'
import { VscQuestion } from 'react-icons/vsc'
import Button from '../components/button.js'
import Tooltip from '../components/tooltip.js'
import Loading from '../components/loading'
import { MOCK_FILES } from '../lib/mock_files'
import { NFTStorage } from 'nft.storage'
import Script from 'next/script'
import { When } from 'react-if'
import bytes from 'bytes'
import countly from '../lib/countly.js'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CopyButton from '../components/copyButton'

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

  let isDev
  if (!!globalThis.window && location.host === 'localhost:4000') isDev = true

  const { status, data } = useQuery(
    queryKey,
    (ctx) => getNfts(ctx.queryKey[1], version),
    {
      enabled: !!user,
    }
  )

  /** @type {any[]} */
  const nfts = isDev ? MOCK_FILES : data || []

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

  /**
   * @param {any} nft
   */
  const TableItem = ({ nft }) => {
    // to do, add actual types
    const deals = nft.deals
      .filter((/** @type {any} */ d) => d.status !== 'queued')
      .map(
        (
          /** @type {any} */ deal,
          /** @type {number} */ i,
          /** @type {any[]} */ deals
        ) => {
          const url = `https://filfox.info/en/deal/${deal.chainDealID}`
          return (
            <span key={deal.chainDealID} title={deal.status}>
              <a
                className="underline black"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                {deal.miner}
              </a>
              {i === deals.length - 1 ? '' : ', '}
            </span>
          )
        }
      )

    const queuedDeals = nft.deals.filter(
      (/** @type {any} */ d) => d.status === 'queued'
    )
    if (queuedDeals.length) {
      const message = `The content from this upload has been aggregated for storage on Filecoin and is queued for deals with ${
        queuedDeals.length
      } storage provider${
        queuedDeals.length > 1 ? 's' : ''
      }. Filecoin deals will be active within 48 hours of upload.`
      deals.push(
        <span
          key={nft.cid + '-pending'}
          aria-describedby="queued-deals-tooltip"
        >
          {`${deals.length ? ', ' : ''}${queuedDeals.length} pending`}
          <Tooltip
            placement="top"
            overlay={<span>{message}</span>}
            overlayClassName="table-tooltip"
            id="queued-deals-tooltip"
          >
            <VscQuestion size={16} className="ml2" />
          </Tooltip>
        </span>
      )
    }

    if (!nft.deals.length) {
      deals.push(
        <span
          className="queuing flex items-center"
          key="queuing"
          aria-describedby="all-deals-queued-tooltip"
        >
          Queuing
          <Tooltip
            overlay={
              <span>
                The content from this upload is being aggregated for storage on
                Filecoin. Filecoin deals will be active within 48 hours of
                upload.
              </span>
            }
            overlayClassName="table-tooltip"
            id="all-deals-queued-tooltip"
          >
            <VscQuestion size={16} className="ml2 flex self-end" />
          </Tooltip>
        </span>
      )
    }

    return (
      <tr className="bg-white bb">
        <td data-label="Date" className="nowrap" title={nft.created}>
          {nft.created.split('T')[0]}
        </td>
        <td data-label="CID" className="nowrap">
          <CopyButton
            title="Copy cid to Clipboard"
            text={nft.cid}
            popupContent={'CID has been copied!!'}
          >
            <p className="dib black">{nft.cid}</p>
          </CopyButton>
          <GatewayLink cid={nft.cid} type={nft.type} />
        </td>
        <td data-label="Pin Status" className="nowrap">
          {nft.pin.status.charAt(0).toUpperCase() + nft.pin.status.slice(1)}
        </td>
        <td data-label="Deals">
          <div>{deals}</div>
        </td>
        <td data-label="Size" className="nowrap">
          {bytes(nft.size || 0)}
        </td>
        <td className="shrink-cell center-cell">
          <form onSubmit={handleDeleteFile}>
            <input type="hidden" name="cid" value={nft.cid} />
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
              {deleting === nft.cid ? 'Deleting...' : 'Delete'}
            </Button>
          </form>
        </td>
      </tr>
    )
  }

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
                          <th className="">Pin Status</th>
                          <th className="">Storage Providers</th>
                          <th className="">Size</th>
                          <th className="">
                            <span className="sr-only">File Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nfts.map(
                          (/** @type {any} */ nft, /** @type {number} */ i) => (
                            <TableItem nft={nft} key={`nft-${i}`} />
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
    : `ipfs://${cid}`
  const href = type === 'nft' ? `${gatewayLink}/metadata.json` : gatewayLink

  return (
    <CopyButton
      title="Copy IPFS Url to Clipboard"
      text={href}
      popupContent={'IPFS Url has been copied!'}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="chicagoflf black"
      >
        URL:
      </a>
    </CopyButton>
  )
}
