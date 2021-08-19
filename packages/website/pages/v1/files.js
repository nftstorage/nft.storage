import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import bytes from 'bytes'
import { NFTStorage } from 'nft.storage'
import Button from '../../components/button.js'
import Loading from '../../components/loading'
import { getNfts, getToken, API } from '../../lib/api-v1.js'
import { When } from 'react-if'

/**
 * Static Props
 *
 * @returns {{ props: import('../../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Files - NFT Storage',
      navBgColor: 'nsyellow',
      redirectTo: '/',
      needsUser: true,
    },
  }
}

/**
 * Files Page
 *
 * @param {import('../../components/types.js').LayoutChildrenProps} props
 * @returns
 */
export default function Files({ user }) {
  const [deleting, setDeleting] = useState('')
  const [limit] = useState(25)
  const [befores, setBefores] = useState([new Date().toISOString()])
  const queryClient = useQueryClient()
  const queryParams = { before: befores[0], limit }
  /** @type {[string, { before: string, limit: number }]} */
  const queryKey = ['get-nfts-v1', queryParams]
  const { status, data } = useQuery(
    queryKey,
    (ctx) => getNfts(ctx.queryKey[1]),
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
        await NFTStorage.delete(
          {
            token: await getToken(),
            endpoint: new URL(API),
            version: '/v1',
          },
          cid
        )
      } finally {
        await queryClient.invalidateQueries('get-nfts-v1')
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

  const hasZeroNfts = nfts.length === 0 && befores.length === 1

  return (
    <main className="bg-nsyellow">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        <When condition={status === 'loading'}>
          <Loading />
        </When>
        <When condition={status !== 'loading'}>
          <>
            <div className="flex mb3 items-center">
              <h1 className="chicagoflf mv4 flex-auto">Files</h1>
              <Button href="/v1/new-file" className="flex-none" id="upload">
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
                  <table className="bg-white ba b--black w-100 collapse">
                    <thead>
                      <tr className="bb b--black">
                        <th className="pa2 tl bg-nsgray br b--black w-33">
                          Date
                        </th>
                        <th className="pa2 tl bg-nsgray br b--black w-33">
                          CID
                        </th>
                        <th className="pa2 tl bg-nsgray br b--black w-33">
                          Size
                        </th>
                        <th className="pa2 tc bg-nsgray" />
                      </tr>
                    </thead>
                    <tbody>
                      {nfts.map(
                        (/** @type {any} */ nft, /** @type {number} */ i) => (
                          <tr className="bb b--black" key={`nft-${i}`}>
                            <td className="pa2 br b--black">
                              {nft.created.split('T')[0]}
                            </td>
                            <td className="pa2 br b--black">
                              <GatewayLink cid={nft.cid} />
                            </td>
                            <td className="pa2 br b--black mw7">
                              {bytes(nft.size || 0)}
                            </td>
                            <td className="pa2">
                              <form onSubmit={handleDeleteFile}>
                                <input
                                  type="hidden"
                                  name="cid"
                                  value={nft.cid}
                                />
                                <Button
                                  className="bg-nsorange white"
                                  type="submit"
                                  disabled={Boolean(deleting)}
                                  id="delete-nft"
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
                  <div className="tc mv3">
                    <Button
                      className="black"
                      wrapperClassName="mh2"
                      disabled={befores.length === 1}
                      onClick={handlePrevClick}
                      id="files-previous"
                    >
                      ← Previous
                    </Button>
                    <Button
                      className="black"
                      wrapperClassName="mh2"
                      disabled={nfts.length < limit}
                      onClick={handleNextClick}
                      id="files-next"
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
  )
}

/**
 * Gateway Link Component
 *
 * @param {{cid: string}} props
 */
function GatewayLink({ cid }) {
  const href = cid.startsWith('Qm')
    ? `https://ipfs.io/ipfs/${cid}`
    : `https://${cid}.ipfs.dweb.link`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="black">
      {cid}
    </a>
  )
}
