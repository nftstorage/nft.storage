import HashLink from '../components/hashlink.js'
/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Terms of Service - NFT Storage',
      navBgColor: 'nspeach',
      needsUser: false,
    },
  }
}

export default function TermsOfService() {
  return (
    <main className="bg-nspeach">
      <div className="mw9 center pa4 pa5-ns">
        <h1 className="chicagoflf">
          <HashLink id="terms-of-service">Terms of Service</HashLink>
        </h1>
        <p className="lh-copy">
          The following terms and conditions govern all use of the{' '}
          <a className="black" href="https://nft.storage">
            nft.storage
          </a>{' '}
          website (the “Website”) and all content, services and products
          available at or through the Website. The Website is offered subject to
          your acceptance without modification of all of the terms and
          conditions contained herein. As all data uploaded to nft.storage will
          be stored on IPFS, this website incorporates the{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            Terms of Service of IPFS.io
          </a>
          .
        </p>
        <p className="lh-copy">
          If you do not agree to all the terms and conditions of this agreement,
          then you may not access the Website or use any services.
        </p>
        <h2 className="chicagoflf">
          <HashLink id="storage-term">Storage Term</HashLink>
        </h2>
        <p className="lh-copy">
          Data will be stored at no cost to the user on IPFS for as long as
          Protocol Labs, Inc. continues to offer free storage for NFT’s.
          Protocol Labs, Inc. reserves the right to terminate NFT.storage at its
          sole discretion.
        </p>
        <p className="lh-copy">
          Data will continue to be persisted ad infinitum <strong>or</strong>{' '}
          until Protocol Labs decides to conclude the NFT.storage project. Prior
          to termination, Protocol Labs will provide 90 days notice to users via
          email to allow users enough time to make arrangements for storing
          their data by other means.
        </p>

        <h2 className="chicagoflf">
          <HashLink id="data-limits">Data Limits</HashLink>
        </h2>
        <p className="lh-copy">
          The <strong>BETA</strong> service is limited to <strong>100MB</strong>{' '}
          upload limit per request. Protocol Labs may increase this limit at its
          sole discretion.
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
          (i.e. not mainnet). These deals will be flagged as not being a mainnet
          deal and will be lost on network resets. Node’s that are stored data
          are not guaranteed to be accessible and may only be available via
          private networks for testing purposes.
        </p>
        <p className="lh-copy">
          It is recommended that you do not rely on Filecoin deals directly and
          instead you allow{' '}
          <a className="black" href="https://nft.storage">
            nft.storage
          </a>{' '}
          to make the data available in IPFS. Retrieving data over the IPFS
          network is the recommended means of accessing{' '}
          <a className="black" href="https://nft.storage">
            nft.storage
          </a>{' '}
          data.
        </p>
      </div>
    </main>
  )
}
