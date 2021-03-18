import useSWR from 'swr'
import HashLink from '../components/hashlink.js'
import { getEdgeState } from '../lib/state.js'
import Layout from '../components/layout.js'

export default function TermsOfService() {
  const { data } = useSWR('edge_state', getEdgeState)
  const { user, loginUrl = '#' } = data ?? {}
  return (
    <Layout
      user={user}
      loginUrl={loginUrl}
      navBgColor="nspeach"
      title="Terms of Service - NFT Storage"
    >
      <main className="bg-nspeach">
        <div className="mw9 center pa4 pa5-ns">
          <h1 className="chicagoflf">
            <HashLink id="terms-of-service">Terms of Service</HashLink>
          </h1>
          <h2 className="chicagoflf">
            <HashLink id="storage-term">Storage Term</HashLink>
          </h2>
          <p className="lh-copy">
            Data will be stored for FREE on IPFS for as long as we continue to
            offer free storage for NFT’s.
          </p>
          <p className="lh-copy">
            Data will continue to be persisted ad infinitum <strong>or</strong>{' '}
            until Protocol Labs decide to conclude the project. 90 days notice
            will be given before the project is concluded to allow users time
            enough to make arrangements for storing their data by other means.
          </p>

          <h2 className="chicagoflf">
            <HashLink id="data-limits">Data Limits</HashLink>
          </h2>
          <p className="lh-copy">
            Each user of the service is allowed to store up to{' '}
            <strong>5GB</strong> of data for free. Please{' '}
            <a
              className="black"
              href="https://github.com/ipfs-shipyard/nft.storage/issues/new"
            >
              contact us
            </a>{' '}
            if you are likely to need more. Multiple accounts created by the
            same user/organisation will be liable to termination and data will
            be removed.
          </p>
          <p className="lh-copy">
            The <strong>BETA</strong> service is limited to{' '}
            <strong>100MB</strong> upload limit per request. This may be raised
            in the future.
          </p>

          <h2 className="chicagoflf">
            <HashLink id="filecoin-deals">Filecoin Deals</HashLink>
          </h2>
          <p className="lh-copy">
            Data stored in{' '}
            <a className="black" href="https://nft.storage">
              nft.storage
            </a>{' '}
            is guaranteed to be available in IPFS. Data may also be stored in
            Filecoin but the time, duration, and number of deals are not
            guaranteed.
          </p>
          <p className="lh-copy">
            Deals may be made with Filecoin nodes operating on test network(s)
            (i.e. not mainnet). These deals will be flagged as not being a
            mainnet deal and will be lost on network resets. Node’s that are
            stored data are not guaranteed to be accessible and may only be
            available via private networks for testing purposes.
          </p>
          <p className="lh-copy">
            It is recommended that you do not rely on Filecoin deals directly
            and instead you allow{' '}
            <a className="black" href="https://nft.storage">
              nft.storage
            </a>{' '}
            to make the data available in IPFS. Retrieving data over the IPFS
            network is the only reliable means of accessing nft.storage data.
          </p>
        </div>
      </main>
    </Layout>
  )
}
