import HashLink from '../components/hashlink.js'
/**
 *
 * @returns {{ props: import('../components/types.js').LayoutProps}}
 */
export function getStaticProps() {
  return {
    props: {
      title: 'Terms of Service - NFT Storage',
      description: 'NFT.Storage terms-of-service',
      navBgColor: 'bg-nspeach',
      needsUser: false,
    },
  }
}

export default function TermsOfService() {
  return (
    <main className="bg-nspeach grow">
      <div className="max-w-7xl mx-auto p-8 sm:p-16">
        <h1 className="chicagoflf">
          <HashLink id="terms-of-service">Terms of Service</HashLink>
        </h1>
        <p className="leading-normal my-2">
          The following terms and conditions govern all use of the{' '}
          <a className="black" href="https://nft.storage">
            NFT.Storage
          </a>{' '}
          website (the “Website”) and all content, services and products
          available at or through the Website (the “Service”). These terms and
          conditions are entered into by and between you and Protocol Labs, Inc.
          (“Protocol Labs”). The Website is offered subject to your acceptance
          without modification of all of the terms and conditions contained
          herein. As all data uploaded to NFT.Storage will be stored on IPFS,
          this website incorporates the{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            Terms of Service of IPFS.io
          </a>
          .
        </p>
        <p className="leading-normal my-2">
          If you do not agree to all the terms and conditions of this agreement,
          then you may not access the Website or use any services.
        </p>

        <h3 className="chicagoflf">
          <HashLink id="data-limits">Data Limits</HashLink>
        </h3>
        <p className="leading-normal my-2">
          The Service is offered for the creation and storage of NFTs. Use of
          the Service to store other types of data is not permitted. The Service
          accepts uploads of up to 31GiB in size per individual upload.
          Currently, the Service does not limit users with respect to the total
          amount of data they can upload. Protocol Labs may amend this limit at
          its sole discretion, though any such amendment will not affect data
          previously uploaded.
        </p>

        <h2 className="chicagoflf">
          <HashLink id="storage-term">Storage Term</HashLink>
        </h2>
        <p className="leading-normal my-2">
          Data stored on the Service is stored on the Filecoin network in
          long-term deals with independent Filecoin storage providers, and may
          also be stored redundantly by other means to support the functionality
          of the Service. Data larger than the upload limit may not be stored in
          a Filecoin deal. The time for data to be aggregated into a Filecoin
          deal varies, and the number of deals that will support storage of
          given data are variable.
        </p>
        <p className="leading-normal my-2">
          Filecoin deals are public, and anyone can access information about
          them (e.g., content address, duration, expiration, price, etc.) and
          renew or create new deals storing the underlying data. Data will be
          stored on the Service indefinitely through auto-renewal of storage
          deals or equivalent means. Protocol Labs will provide the Service at
          no cost to the user, and may transfer responsibility for that no-cost
          service to another party providing a funding mechanism that
          equivalently subsidizes data storage. In the unlikely event of
          cessation or change in the nature of the Service, existing Filecoin
          storage deals will continue until their designated end date, and
          Protocol Labs will: (1) provide at least 90 days’ notice to users
          before any such service change or cessation, and (2) provide users
          with the ability to export all material data associated with their
          user account, including the content addresses of NFT-related data and
          information about any Filecoin deals containing this data for users
          who want to continue storing this data in Filecoin deals.
        </p>
        <p className="leading-normal my-2">
          All data uploaded via the Service is available to anyone who requests
          it using the correct content identifier. Users should not store any
          private or sensitive information in an unencrypted form using the
          Service. Deleting files from the Service will remove them from the
          file listing for a user&apos;s account, but nodes on the IPFS network
          may retain copies of the data indefinitely and data aggregated into
          Filecoin deals will persist for the duration of the relevant storage
          deal.
        </p>

        <h2 className="chicagoflf">
          <HashLink id="gateway">NFT.Storage Gateway</HashLink>
        </h2>
        <p className="leading-normal my-2">
          Use of the NFT.Storage Gateway (“the Gateway”) is subject to the Terms
          of Service of{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            IPFS.io
          </a>
          .
        </p>
        <p className="leading-normal my-2">
          When you access content via the Gateway, Protocol Labs may cache that
          content or the associated CID for performance reasons. Protocol Labs
          may also collect analytics data on use of the Gateway, including data
          on requests, gateway speeds, CIDs, and other performance data.
          Protocol Labs reserves all rights in and to any performance data and
          analytics collected in the course of providing the Gateway for
          optimizing the Gateway user experience.
        </p>
        <p className="leading-normal my-2">
          If you encounter content that violates the{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            Terms of Service of IPFS.io
          </a>
          (e.g., spam/phishing content or your unauthorized copyrighted
          content), please reach out to abuse@ipfs.io, making sure to include
          the relevant URL. If we determine that the content violates our Terms
          of Service we will remove or disable access to that content. If your
          complaint is copyright-related, please make sure your DMCA Notice
          contains the required information listed in our{' '}
          <a className="black" href="https://ipfs.io/legal/">
            DMCA Policy
          </a>
          .
        </p>

        <h2 className="chicagoflf">
          <HashLink id="superhot">SuperHot Caching Service</HashLink>
        </h2>
        <p className="leading-normal my-2">
          Use of the SuperHot caching service (“Superhot”) is also subject to the Terms 
          of Service of{' '}
          <a className="black" href="https://discuss.ipfs.io/tos">
            IPFS.io
          </a>
          .
        </p>
        <p className="leading-normal my-2">
          Protocol Labs reserves the right to delete cached content from servers 
          managed or controlled by Protocol Labs if we determine that the content 
          violates the Terms of Service of IPFS.io.  For severe violations, or if 
          we determine you are a repeat infringer of others’ copyrighted content, 
          we reserve the right to suspend or terminate your use of SuperHot and/or 
          all Services. Protocol Labs may collect analytics data on the usage of 
          SuperHot, including data on requests, retrieval speeds, CIDs, and other 
          performance data. Protocol Labs reserves all rights in and to such 
          performance data and analytics.
        </p>
      </div>
    </main>
  )
}
