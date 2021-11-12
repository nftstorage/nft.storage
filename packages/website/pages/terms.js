import HashLink from '../components/hashlink.js'
/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Terms of Service - NFT Storage',
      navBgColor: 'bg-nspeach',
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
            NFT.Storage
          </a>{' '}
          website (the “Website”) and all content, services, and products
          available at or through the Website. As all data uploaded to {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} will
          be stored on IPFS, this website incorporates the{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            Terms of Service of IPFS.io
          </a>
          .
        </p>
        
        <h2 className="chicagoflf">
          <HashLink id="storage-term">Storage Term</HashLink>
        </h2>
        <p className="lh-copy">
          All data is stored redundantly on both the IPFS and Filecoin networks, 
          and guaranteed to be publicly available and verifiable via its unique 
          content identifier.
        </p>
        <p className="lh-copy">
          All data stored on {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} is stored in long-term (18 month) deals 
          with independent Filecoin Storage Providers. Filecoin storage deals can 
          be renewed by anyone and are non-custodial. Anyone can access information 
          about them (content address, duration, expiration, price, etc.) and 
          verify that the data is legitimately stored via the Filecoin blockchain. 
          All Filecoin deals are{' '}
          <a className="black" href="https://github.com/filecoin-project/filecoin-plus-client-onboarding">
            Verified Deals
          </a>{' '}
          , which Filecoin Storage Providers are incentivized to accept at a lower 
          price vs. other deals because they have a relatively higher increase in 
          their chance to win block rewards.
        </p>
        <p className="lh-copy">
          {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} is committed to ensuring that all NFTs on Filecoin have a 
          perpetual storage solution. All Filecoin storage deals facilitated by 
          {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} are automatically renewed in perpetuity by {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} before 
          expiration. {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} will switch to non-custodial, perpetual renewal 
          of storage contracts independent of the service to secure the perpetual 
          persistence of all NFTs without dependence on any single entity when the 
          tooling becomes available in the Filecoin network (estimated late 2022).
        </p>
        <p className="lh-copy">
          In addition to storing data in Filecoin deals, {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} currently 
          stores data on a self-managed IPFS Cluster with 6 nodes, with any given 
          data replicated on 3 of them. These nodes are used to (1) store data 
          while data is being aggregated into Filecoin deals, and (2) provide 
          data to the public IPFS network for retrieval. This IPFS Cluster 
          infrastructure may undergo changes over time, such as migrations or 
          upgrades. Additional content-addressed copies of the data are also 
          kept outside this IPFS Cluster.
        </p>
        <p className="lh-copy">
          Data stored via {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} is guaranteed to be publicly available via 
          IPFS, and users are responsible and liable for the data they upload. 
          All data uploaded is available to anyone who requests it 
          using the correct CID. Users should not store any private or sensitive 
          information in an unencrypted form using {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '}. Further, deleting 
          files from {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} will remove them from the file listing for a user's 
          account, but nodes on the IPFS network may retain copies of the data indefinitely
          and data aggregated into Filecoin deals will persist for the duration of the deal. 
          Users should not use {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} for data that may need to be permanently 
          deleted in the future.
        </p>
        <p className="lh-copy">
          In a worst-case scenario where {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} needs to be terminated, the service 
          will provide at least 180 days notice to users. Per the Filecoin protocol, all 
          existing Filecoin deals will continue, independent of the service. In this scenario,
          {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} 
          will do the following to make the transition for its users as seamless as possible: 
          (1) give users an export of all data associated with their account, including 
          the content addresses of this data and information about the Filecoin deals 
          containing this data, (2) provide free renewal of Filecoin deals until an automated, 
          perpetual solution exists, and (3) store a redundant copy of all data on an IPFS 
          storage provider (e.g., pinning service) with a long-term storage arrangement.
        </p>
        <p className="lh-copy">
          Data that satisfies the data limits are also guaranteed to be stored in Filecoin, 
          but the time for data to get into a deal and the number of deals are not guaranteed. 
          Data larger than the limit may not be stored in a Filecoin deal.
        </p>

        <h2 className="chicagoflf">
          <HashLink id="data-limits">Data Limits</HashLink>
        </h2>
        <p className="lh-copy">
          The service accepts arbitrary upload sizes up to 31GiB per upload. Currently, 
          accounts do not have a limit to the total data they can upload. {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} may 
          amend this limit at its discretion, though this does not affect any data already 
          uploaded by an account.
        </p>

        <h2 className="chicagoflf">
          <HashLink id="cost">Cost</HashLink>
        </h2>
        <p className="lh-copy">
          {' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '} intends to provide free, perpetual storage for NFTs. All data already 
          uploaded to the service for free will continue to be persisted on the Filecoin 
          network at no cost to the user. When a facility for perpetual, non-custodial 
          storage is available in the Filecoin network (referenced in the Storage Terms),
          other entities might contribute to subsidizing the cost for users.
        </p>
        <h2 className="chicagoflf">
          <HashLink id="acceptance-of-conditions">Acceptance of Conditions</HashLink>
        </h2>
        <p className="lh-copy">
          The Website is offered subject to your acceptance without modification of all 
          of the terms and conditions contained herein. If you do not agree to all the 
          terms and conditions of this agreement, then you may not access the Website or 
          use any services.
        </p>
      </div>
    </main>
  )
}
