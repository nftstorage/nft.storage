import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import filesize from 'filesize'
import { NFTStorage } from 'nft.storage'
import Button from '../components/button.js'
import Loading from '../components/loading'
import { getNfts, getToken, API } from '../lib/api.js'

export function getStaticProps() {
  return {
    props: {
      title: 'Files - NFT Storage',
      navBgColor: 'nsyellow',
      needsUser: true,
    },
  }
}
export default function Files({ user }) {
  const [deleting, setDeleting] = useState(false)
  const queryClient = useQueryClient()
  const { status, data: nfts } = useQuery('get-nfts', getNfts, {
    enabled: !!user,
  })

  async function handleDeleteFile(e) {
    e.preventDefault()
    if (!confirm('Are you sure? Deleted files cannot be recovered!')) {
      return
    }
    setDeleting(e.target.cid.value)
    try {
      const client = new NFTStorage({ token: await getToken(), endpoint: API })
      await client.delete(e.target.cid.value)
    } finally {
      queryClient.invalidateQueries('get-nfts')
      setDeleting(false)
    }
  }

  return (
    <main className="bg-nsyellow">
      <div className="mw9 center pv3 ph3 ph5-ns min-vh-100">
        {status === 'loading' ? (
          <Loading />
        ) : (
          <>
            <div className="flex mb3 items-center">
              <h1 className="chicagoflf mv4 flex-auto">Files</h1>
              <Button href="/new-file" className="flex-none">
                + Upload
              </Button>
            </div>
            <div className="table-responsive">
              {nfts ? (
                <table className="bg-white ba b--black w-100 collapse">
                  <thead>
                    <tr className="bb b--black">
                      <th className="pa2 tl bg-nsgray br b--black w-33">
                        Date
                      </th>
                      <th className="pa2 tl bg-nsgray br b--black w-33">CID</th>
                      <th className="pa2 tl bg-nsgray br b--black w-33">
                        Size
                      </th>
                      <th className="pa2 tc bg-nsgray" />
                    </tr>
                  </thead>
                  <tbody>
                    {nfts.map((nft, i) => (
                      <tr className="bb b--black" key={`nft-${i}`}>
                        <td className="pa2 br b--black">
                          {nft.created.toISOString().split('T')[0]}
                        </td>
                        <td className="pa2 br b--black">
                          <GatewayLink cid={nft.cid} />
                        </td>
                        <td className="pa2 br b--black mw7">
                          {filesize(nft.size || 0)}
                        </td>
                        <td className="pa2">
                          <form onSubmit={handleDeleteFile}>
                            <input type="hidden" name="cid" value={nft.cid} />
                            <Button
                              className="bg-nsorange white"
                              type="submit"
                              disable={deleting}
                            >
                              {deleting === nft.cid ? 'Deleting...' : 'Delete'}
                            </Button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="tc mv5">
                  <span className="f1 dib mb3">😢</span>
                  <br />
                  No files
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

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
