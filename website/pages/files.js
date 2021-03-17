import Head from 'next/head'
import useSWR from 'swr'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
import Button from '../components/button.js'
import { getEdgeState } from '../lib/state.js'

export default function Files () {
  const { data } = useSWR('edge_state', getEdgeState)
  const { user, loginUrl = '#', nfts = [] } = data ?? {}
  return (
    <div className='sans-serif'>
      <Head>
        <title>Files</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar user={user} loginUrl={loginUrl} bgColor='nsyellow' />
      <main className='bg-nsyellow'>
        <div className='mw9 center pv3 ph5 min-vh-100'>
          <div className='flex mb3 items-center'>
            <h1 className='chicagoflf mv4 flex-auto'>Files</h1>
            {/* <Button href='/new-file.html' className='flex-none' disabled>+ Upload</Button> */}
          </div>
          {nfts.length ? (
            <table className='bg-white ba b--black w-100 collapse mb4'>
              <tr className='bb b--black'>
                <th className='pa2 tl bg-nsgray br b--black w-50'>CID</th>
                <th className='pa2 tl bg-nsgray br b--black w-50'>Size</th>
                <th className='pa2 tc bg-nsgray' />
              </tr>
              {nfts.map(nft => (
                <tr className='bb b--black'>
                  <td className='pa2 br b--black'>
                    <GatewayLink cid={nft.cid} />
                  </td>
                  <td className='pa2 br b--black mw7'>
                    {nft.size}
                  </td>
                  <td className='pa2'>
                    <form action='/delete' method='DELETE'>
                      <input type='hidden' name='id' value='1' />
                      <Button className='bg-nsorange white' type='submit'>Delete</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </table>
          ) : <p className='tc mv5'><span className='f1 dib mb3'>😢</span><br/>No files</p>}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function GatewayLink ({ cid }) {
  const href = cid.startsWith('Qm') ? `https://ipfs.io/ipfs/${cid}` : `https://${cid}.ipfs.dweb.link`
  return <a href={href} target='_blank' rel='noopener noreferrer' className='black'>{cid}</a>
}
