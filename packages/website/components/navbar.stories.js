import React from 'react'
import NavBar from './navbar'
import { useQueryClient, QueryClientProvider } from 'react-query'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: NavBar,
  title: 'NavBar',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bgColor: {
      options: ['bg-forest', 'bg-yellow', 'bg-green', 'bg-peach', 'bg-ltblue'],
      control: { type: 'select' },
    },
    logo: {
      options: [
        '/images/logo-nft-storage-inline-dark.svg',
        '/images/logo-nft-storage-inline.svg',
      ],
      control: { type: 'select' },
    },
    user: {
      control: { type: 'boolean' },
    },
  },
}

const Template = (
  /** @type {{
   * logo: string;
   * bgColor: string;
   * user: boolean;
   * }} */
  args
) => {
  const queryClient = useQueryClient()
  const userMock = {
    email: 'foo@bar.com',
    isMfaEnabled: false,
    issuer: 'did:ethr:0x6CA660ec2116Bd792AB7Cd5A10e1Eb8310F6f125',
    phoneNumber: null,
    publicAddress: '0x6CA660ec2116Bd792AB7Cd5A10e1Eb8310F6f125',
    tags: {
      HasAccountRestriction: false,
      HasPsaAccess: false,
      HasSuperHotAccess: false,
    },
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar
        logo={{ src: args.logo, isDark: true }}
        bgColor={args.bgColor}
        user={args.user ? userMock : null}
      />
    </QueryClientProvider>
  )
}

export const Default = Template.bind({})
