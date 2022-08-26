import InlineCode from '../components/inline-code'
import Link from '../components/link'

const faqContent = {
  longTermVision: (
    <p>
      NFT.Storage helps NFT developers today who are looking for easy APIs and
      best practices for storing their NFT data securely and resiliently. Even
      in the short-term, it is a trustless and decentralized solution. Users are
      able to cryptographically verify that the{' '}
      <a
        className="text-white"
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
    <p className="lh-copy text-white mb4">
      Data will be available in IPFS indefinitely as well as stored in
      long-term, redundant Filecoin storage deals with the global community of
      miners. See the{' '}
      <Link href="/terms" className="text-white">
        Terms of Service
      </Link>{' '}
      for details.
    </p>
  ),
  nftSizeRestrictions: (
    <p className="lh-copy text-white mb4">
      NFT.Storage accepts storage requests up to <strong>31GiB</strong> in size
      per individual upload! Each upload can include a single file or a
      directory of files. (If you are using the HTTP API, you&apos;ll need to do
      some manual splitting for files over 100MB. See the{' '}
      <Link href="/api-docs" className="text-white">
        HTTP API docs
      </Link>{' '}
      for details.) Currently, the rate limit will be triggered if the API
      receives more than 30 requests using the same API key within a 10 second
      window.
    </p>
  ),
  nftBestPractices: (
    <p className="lh-copy text-white mb4">
      Visit{' '}
      <a href="https://nftschool.dev" className="text-white">
        NFT School
      </a>{' '}
      for information on NFT best practices as well as a variety of helpful
      tutorials and how-to guides for NFT developers.
    </p>
  ),
  whoHasAccess: (
    <p className="lh-copy text-white mb4">
      All data uploaded to NFT.Storage is available to anyone who requests it
      using the correct CID. Do not store any private or sensitive information
      in an unencrypted form using NFT.Storage.
    </p>
  ),
  dataDeletion: (
    <p className="lh-copy text-white mb4">
      You can delete data from being associated with your account, and it will
      no longer appear on the Files page of your account. However, this doesn’t
      prevent nodes in the IPFS decentralized storage network from retaining
      copies of the data indefinitely. Do not use NFT.Storage for data that may
      need to be permanently deleted in the future.
    </p>
  ),
  httpGatewayError: (
    <p className="lh-copy text-white mb4">
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
    <p className="lh-copy text-white mb4">
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
        className="text-white"
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
        className="text-white"
      >
        Protocol Labs
      </a>{' '}
      is committed to maintaining this infrastructure indefinitely as part of
      our mission to grow the decentralized storage ecosystem and preserve
      humanity&#39;s information for future generations.
    </p>
  ),
  filesLimit: (
    <p className="lh-copy text-white mb4">
      There are no limits enforced by the service, other than the size limit of
      31GiB per individual upload. However, if your directory is large or has a
      lot of files, you might have some difficulty uploading it due to memory
      issues (especially if you are uploading to the website via your browser or
      the directory size is larger than your device&#39;s memory) or connection
      issues. If this is the case for you, we recommend splitting up your
      directory into smaller directories.
    </p>
  ),
  unexpectedToken: (
    <p className="lh-copy text-white mb4">
      <strong>Try updating to Node version 14 or later</strong>. We no longer
      offer support for versions prior to v14 (
      <Link href="/faq/#why-no-support-for-node-pre-14" className="text-white">
        see here
      </Link>
      ). This error can occur when attempting to use{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        Optional Chaining
      </a>{' '}
      with an old version of Node.
    </p>
  ),
  importStatementOutsideModule: (
    <p className="lh-copy text-white mb4">
      <strong>Try updating to Node version 14 or later</strong>. This error can
      occur because of having an old version of Node. We no longer offer support
      for Node versions prior to v14 (
      <Link href="/faq/#why-no-support-for-node-pre-14" className="text-white">
        see here
      </Link>
      ). With Node v14 or greater, you should be able to use{' '}
      <InlineCode>import</InlineCode> if you are using ESM Modules, otherwise
      you will need to use <InlineCode>require</InlineCode>.
    </p>
  ),
  nodeSupport: (
    <p className="lh-copy text-white mb4">
      We do not support versions of Node prior to v14 because they are not
      considered active{' '}
      <a
        href="https://nodejs.org/en/about/releases/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        releases
      </a>{' '}
      and that would mean loss of important, newer features such as{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining#browser_compatibility"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        Optional Chaining
      </a>
      .
    </p>
  ),
  httpUrls: (
    <p className="lh-copy text-white mb4">
      We generally try to steer people away from linking to specific HTTP
      gateways, since they can be a single point of failure and may go down or
      disappear some point. If your heart is set on using HTTP URLs, I&#39;d say
      your best bet is to create the metadata json manually and store it using{' '}
      <InlineCode>storeBlob</InlineCode>. There&#39;s an example app called{' '}
      <a
        href="https://github.com/yusefnapora/minty"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        minty
      </a>{' '}
      that creates metadata like this, which might help demonstrate. Minty
      stores IPFS URIs in the metadata, but it could easily be modified to store
      gateway URLs instead.
    </p>
  ),
  webpack4: (
    <p className="lh-copy text-white mb4">
      NFT.Storage is packaged in a way that causes issues with Webpack 4 and
      other JavaScript build tools that have not been updated to support the{' '}
      <InlineCode>exports</InlineCode> field in{' '}
      <InlineCode>package.json</InlineCode>. If you are unable to change your
      build tooling, you can import a pre-bundled version of the NFT.Storage
      library by changing your import statment. Please see the{' '}
      <a href="/docs/troubleshooting/#why-am-i-seeing-module-not-found-errors">
        troubleshooting entry
      </a>{' '}
      for an example.
    </p>
  ),
}

export default faqContent
