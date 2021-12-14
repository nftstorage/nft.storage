import InlineCode from '../components/inline-code'
import Link from 'next/link'

const faqContent = {
  longTermVision: (
    <p>
      NFT.Storage helps NFT developers today who are looking for easy APIs and
      best practices for storing their NFT data securely and resiliently. Even
      in the short-term, it is a trustless and decentralized solution. Users are
      able to cryptographically verify that the{' '}
      <a
        className="white"
        href="https://docs.ipfs.io/concepts/content-addressing"
        target="_blank"
        rel="noreferrer"
      >
        content identifiers
      </a>{' '}
      that the service provides corresponds to their data, and that this data is
      hosted in multiple ways across the IPFS and Filecoin networks (allowing
      for accessibility across the network and preventing lock-in, with users
      also able to pin their data elsewhere to increase redundance).
      <br />
      <br />
      Though we believe that there will always be value in some form of the
      libraries and services NFT.Storage provides, in the long-term the goal is
      to increasingly decentralize NFT.Storage. This includes relying more
      directly on the Filecoin network as the protocol continues to evolve. Some
      examples include storing data directly on the Filecoin network without
      putting it on a centralized IPFS node first and building oracles + DAOs +
      bridges to ensure n copies of data on the network (as Filecoin continues
      to evolve). We also want to make it easy for users to deploy and run their
      own NFT.Storage storage service. This, and other exciting things on the
      horizon, will help upgrade {"today's"} NFT.Storage implementation into the
      provably permanent storage solutions of tomorrow.
    </p>
  ),
  dataStorageLength: (
    <p className="lh-copy white mb4">
      Data will be available in IPFS indefinitely as well as stored in
      long-term, redundant Filecoin storage deals with the global community of
      miners. See the{' '}
      <Link href="/terms">
        <a className="white">Terms of Service</a>
      </Link>{' '}
      for details.
    </p>
  ),
  nftSizeRestrictions: (
    <p className="lh-copy white mb4">
      NFT.Storage can store NFTs up to <strong>31GiB </strong>
      in size! (There was previously a 100MB limit due to Cloudflare workers but
      NFT.Storage now supports chunked uploads, allowing files bigger than 100MB
      to be uploaded! 🎉)
    </p>
  ),
  nftBestPractices: (
    <p className="lh-copy white mb4">
      Visit{' '}
      <a href="https://nftschool.dev" className="white">
        NFT School
      </a>{' '}
      for information on NFT best practices as well as a variety of helpful
      tutorials and how-to guides for NFT developers.
    </p>
  ),
  whoHasAccess: (
    <p className="lh-copy white mb4">
      All data uploaded to NFT.Storage is available to anyone who requests it
      using the correct CID. Do not store any private or sensitive information
      in an unencrypted form using NFT.Storage.
    </p>
  ),
  dataDeletion: (
    <p className="lh-copy white mb4">
      You can delete data from being associated with your account, and it will
      no longer appear on the Files page of your account. However, this doesn’t
      prevent nodes in the IPFS decentralized storage network from retaining
      copies of the data indefinitely. Do not use NFT.Storage for data that may
      need to be permanently deleted in the future.
    </p>
  ),
  httpGatewayError: (
    <p className="lh-copy white mb4">
      Not necessarily! HTTP gateways are a great way for users who {"aren't"}{' '}
      running their own IPFS nodes to retrieve content from the IPFS network.
      However, they do introduce a centralized point of failure to a user flow.
      If a given gateway is down, or is under too much load, or is facing other
      issues, users who are accessing content through that gateway might be
      unable to access content. In this case, we recommend trying another
      gateway or running and using your own IPFS node.
      <br />
      <br />
      Additionally, if the data was not stored on NFT.Storage, then there might
      be issues with the IPFS node(s) with a copy of the data providing that
      data to the gateway. Using NFT.Storage makes sure that the content stored
      is broadcasted to the network using best practices!
    </p>
  ),
  howIsNftStorageFree: (
    <p className="lh-copy white mb4">
      Filecoin storage providers commit their hard drive capacity to the
      Filecoin network, and earn significant block rewards for doing so. This
      translates into real-world profits for storage providers, which
      incentivizes them to continue committing additional hard disk space to the
      Filecoin network. However, when storage providers are storing data from
      Filecoin users, their likelihood of winning block rewards goes up by a big
      factor 一 <strong>10x</strong>! Because NFT.Storage participates in
      the&nbsp;
      <a
        href="https://docs.filecoin.io/store/filecoin-plus/"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        Filecoin Plus
      </a>{' '}
      program, all data uploaded through the service is eligible for this 10x
      reward multiplier. This is such a powerful incentive for Filecoin storage
      providers to store user data that they tend to be willing to offer free
      storage and retrieval services in order to get this block reward multiple.
      As a result, most storage providers offer free storage and retrieval on
      Filecoin today and will continue to do so as long as block rewards
      continue to be a powerful incentive. This should be true for a very long
      time 一 for example, it is still the case that block rewards are powerful
      incentives for Bitcoin miners today. While there is some additional
      infrastructure cost associated with running the NFT.Storage service,&nbsp;
      <a
        href="https://protocol.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        Protocol Labs
      </a>{' '}
      is committed to maintaining this infrastructure indefinitely as part of
      our mission to grow the decentralized storage ecosystem and preserve
      humanity&#39;s information for future generations.
    </p>
  ),
  filesLimit: (
    <p className="lh-copy white mb4">
      It depends. If you&#39;re using <InlineCode>storeDirectory</InlineCode>{' '}
      from the JS library (i.e. sending a multipart HTTP request) then the
      request will be limited by 100MB so you&#39;ll only be able to send as
      many files as can fit in that limit. This will be fixed in the future (
      <a
        href="https://github.com/nftstorage/nft.storage/issues/220"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        see here
      </a>
      ). If you have lots of tiny tiny files, then you may end up causing the
      IPFS node to create a directory that is bigger than the maximum block size
      that libp2p is willing to transfer (although it&#39;s not clear if that is
      even possible within the 100MB request limit). This could happen because
      go-ipfs doesn&#39;t currently shard directories (but this is planned by
      default for v0.11). If you use the <InlineCode>storeCar</InlineCode>{' '}
      method from the JS library (i.e. sending multiple split CAR files) then it{' '}
      <em>should be</em> effectively unlimited if you use&nbsp;
      <InlineCode>
        <a
          href="https://www.npmjs.com/package/ipfs-car"
          target="_blank"
          rel="noopener noreferrer"
          className="black"
        >
          ipfs-car
        </a>
      </InlineCode>{' '}
      to create the CAR file since <InlineCode>ipfs-car</InlineCode> uses the
      default <InlineCode>shardSplitThreshold: 1000</InlineCode> from{' '}
      <a
        href="https://www.npmjs.com/package/ipfs-unixfs-importer"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        unixfs-importer
      </a>{' '}
      meaning the directory node likely won&#39;t grow beyond the 1MiB block
      limit.
    </p>
  ),
  unexpectedToken: (
    <p className="lh-copy white mb4">
      <strong>Try updating to Node version 14 or later</strong>. We no longer
      offer support for versions prior to v14 (
      <Link href="/faq/#why-no-support-for-node-pre-14">
        <a className="white">see here</a>
      </Link>
      ). This error can occur when attempting to use{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        Optional Chaining
      </a>{' '}
      with an old version of Node.
    </p>
  ),
  importStatementOutsideModule: (
    <p className="lh-copy white mb4">
      <strong>Try updating to Node version 14 or later</strong>. This error can
      occur because of having an old version of Node. We no longer offer support
      for Node versions prior to v14 (
      <Link href="/faq/#why-no-support-for-node-pre-14">
        <a className="white">see here</a>
      </Link>
      ). With Node v14 or greater, you should be able to use{' '}
      <InlineCode>import</InlineCode> if you are using ESM Modules, otherwise
      you will need to use <InlineCode>require</InlineCode>.
    </p>
  ),
  nodeSupport: (
    <p className="lh-copy white mb4">
      We do not support versions of Node prior to v14 because they are not
      considered active{' '}
      <a
        href="https://nodejs.org/en/about/releases/"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        releases
      </a>{' '}
      and that would mean loss of important, newer features such as{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        Optional Chaining
      </a>
      .
    </p>
  ),
  httpUrls: (
    <p className="lh-copy white mb4">
      We generally try to steer people away from linking to specific HTTP
      gateways, since they can be a single point of failure and may go down or
      disappear some point. If your heart is set on using HTTP URLs, I&#39;d say
      your best bet is to create the metadata json manually and store it using{' '}
      <InlineCode>storeBlob</InlineCode>. There&#39;s an example app called{' '}
      <a
        href="https://github.com/yusefnapora/minty"
        target="_blank"
        rel="noopener noreferrer"
        className="white"
      >
        minty
      </a>{' '}
      that creates metadata like this, which might help demonstrate. Minty
      stores IPFS URIs in the metadata, but it could easily be modified to store
      gateway URLs instead.
    </p>
  ),
  webpack4: (
    <p className="lh-copy white mb4">
      We are working on a long-term solution but for now, you can import the
      prebuilt bundle directly in Then browser from{' '}
      <InlineCode>
        https://cdn.jsdelivr.net/npm/nft.storage@v5.1.3/dist/bundle.esm.min.js
      </InlineCode>
      <br />
      You may also see this error in relation to the issue:
      <br />
      <InlineCode>
        Uncaught SyntaxError: The requested module
        &quot;/-/ipfs-core-utils@v0.10.5-qUdqS0pJ7xHVq6EQnGSz/dist=es2019,mode=imports/unoptimized/src/files/normalise-input/index.js&quot;
        does not provide an export named &quot;normaliseInput&quot;
      </InlineCode>
    </p>
  ),
}

export default faqContent
