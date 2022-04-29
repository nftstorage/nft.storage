import React from 'react'
import { TrustedBy } from './trustedByLogos'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: TrustedBy,
  title: 'TrustedBy',
}

const logos = [
  {
    src: '../marketplace-logos/home/opensea.svg',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/gallery.svg',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/holaplex.png',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/magic-eden.svg',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/makersplace.png',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/nftport.svg',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/project-galaxy.svg',
    alt: '',
  },
  {
    src: '../marketplace-logos/home/tatum.svg',
    alt: '',
  },
]

const Template = () => <TrustedBy logos={logos} />

export const Default = Template.bind({})
