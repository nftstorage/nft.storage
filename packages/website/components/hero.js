import countly from '../lib/countly'
import Button from './button.js'

const crossStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: '100% 100%',
}

export default function Hero() {
  return (
    <div className="bg-nsorange">
      <div className="relative mx-auto max-w-7xl border border-solid b--black">
        <GreenBox
          className="hidden lg:hidden sm:block border-l border-r b--black mx-16"
          style={crossStyle}
        >
          <GreenBox>
            <GreenBox>
              <GreenBox>
                <GreenBox>
                  <GreenBox>
                    <GreenBox>
                      <div
                        className="bg-black"
                        style={{ height: 'min(22vw, 354px)' }}
                      />
                    </GreenBox>
                  </GreenBox>
                </GreenBox>
              </GreenBox>
            </GreenBox>
          </GreenBox>
        </GreenBox>
        <div
          className="relative top-0 lg:relative sm:absolute w-full px-4 text-center"
          style={{ height: '100%' }}
        >
          <img
            height="470"
            width="1002"
            style={{ width: '75vw', maxWidth: '1002px', height: 'auto' }}
            className="mt-8 mb-2 sm:mb-8"
            src="images/logo-nft.storage.svg"
            alt="NFT Storage logo"
          />
          <hgroup className="chicagoflf white">
            <h1 className="text-xl lg:text-4xl sm:text-5xl font-normal my-4">
              Free Storage for NFTs
            </h1>
            <h2 className="text-2xl font-normal max-w-5xl mx-auto my-4 leading-normal">
              Free decentralized storage and bandwidth for NFTs on{' '}
              <img
                src="images/logo-ipfs-sm.png"
                width="57"
                height="64"
                className="v-mid"
                style={{ maxWidth: '28px', height: 'auto' }}
                alt="IPFS logo"
              />{' '}
              IPFS and{' '}
              <img
                src="images/logo-filecoin-sm.png"
                width="61"
                height="60"
                className="v-mid"
                style={{ maxWidth: '30px', height: 'auto' }}
                alt="Filecoin logo"
              />{' '}
              Filecoin.
            </h2>
          </hgroup>
          <div className="flex justify-center">
            <Button
              className="mx-4 mb-4"
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
  className = className ?? 'ba b--black'
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
