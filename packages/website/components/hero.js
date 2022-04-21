import countly from '../lib/countly'
import Button from './button.js'

export default function Hero() {
  return (
    <div className="bg-orange">
      <div className="relative mx-auto max-w-7xl border border-solid border-black">
        <GreenBox className="hidden lg:block border-l border-r border-black mx-16">
          <GreenBox>
            <GreenBox>
              <GreenBox>
                <GreenBox>
                  <GreenBox>
                    <GreenBox>
                      <div className="bg-black h-[min(22vw,_354px)]" />
                    </GreenBox>
                  </GreenBox>
                </GreenBox>
              </GreenBox>
            </GreenBox>
          </GreenBox>
        </GreenBox>
        <div className="relative top-0 lg:absolute w-full px-4 text-center h-full">
          <img
            height="470"
            width="1002"
            className="mt-8 mb-2 sm:mb-8 inline-block h-auto w-[75vw] max-w-[1000px]"
            src="images/logo-nft.storage.svg"
            alt="NFT Storage logo"
          />
          <hgroup className="chicagoflf text-white">
            <h1 className="text-xl lg:text-4xl sm:text-5xl font-normal my-4">
              Free Storage for NFTs
            </h1>
            <h2 className="text-lg sm:text-2xl font-normal max-w-5xl mx-auto my-4 leading-normal">
              Free decentralized storage and bandwidth for NFTs on{' '}
              <img
                src="images/logo-ipfs-sm.png"
                width="57"
                height="64"
                className="align-middle inline max-w-[28px] h-auto"
                alt="IPFS logo"
              />{' '}
              IPFS and{' '}
              <img
                src="images/logo-filecoin-sm.png"
                width="61"
                height="60"
                className="align-middle inline max-w-[30px] h-auto"
                alt="Filecoin logo"
              />{' '}
              Filecoin.
            </h2>
          </hgroup>
          <div className="flex justify-center">
            <Button
              className="mx-4 mb-8"
              href="#getting-started"
              tracking={{ ui: countly.ui.HOME_HERO, action: 'Get Started' }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const greenBoxStyle = {
  paddingTop: 'min(3.6vw, 32px)',
  paddingBottom: 'min(3.6vw, 32px)',
  paddingRight: 'min(3.88vw, 54px)',
  paddingLeft: 'min(3.88vw, 54px)',
}

/**
 * Green Box
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {any} [props.style]
 * @param {any} props.children
 * @returns
 */
function GreenBox({ className, style, children }) {
  style = style ? { ...greenBoxStyle, ...style } : greenBoxStyle
  className = className ?? 'border border-solid border-black'
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
