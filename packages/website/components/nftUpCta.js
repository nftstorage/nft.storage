import Button from '../components/button'

export const NftUpCta = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-16">
      <h2 className="text-center mt-0 chicagoflf">Upload your files now</h2>
      <p className="text-center chicagoflf">
        Upload your files to IPFS easily with our NFTUp application!
      </p>
      <div className="flex justify-center mx-auto mt-5">
        <Button
          className="mx-4 mb-4 !bg-orange w-[250px]"
          href="/docs/how-to/nftup/"
        >
          <img
            className="w-full h-[150px] object-contain object-center rounded select-none mx-auto p-5 bg-orange"
            src={`/images/nft-up-logo.png`}
            alt="NFTUp Logo"
            width="100%"
            height={150}
          />
        </Button>
      </div>
    </div>
  )
}
