import Button from '../components/button'

export const NftUpCta = () => {
  return (
    <div className="flex items-center flex-col lg:flex-row">
      <div className="lg:w-1/2">
        <img src="/images/nft-up-example.png" alt="NFT Up Example" />
      </div>
      <div className="lg:w-1/2 py-8 pl-8">
        <h2 className="mt-0 chicagoflf text-[2.375rem]">
          Upload your files now
        </h2>
        <p className="chicagoflf text-xl leading-9 mt-2">
          Upload your files to IPFS easily with our NFTUp application!
        </p>
        <div className="mt-6">
          <Button
            className="mb-4 border-2 border-black py-2 px-11 chicagoflf"
            unstyled
            href="/docs/how-to/nftup/"
          >
            Get it now
          </Button>
        </div>
      </div>
    </div>
  )
}
