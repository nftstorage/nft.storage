import React from 'react'
import Navbar from '.'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContext } from 'lib/user'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Navbar,
  title: 'Navbar',
  parameters: {
    // layout: 'centered',
  },
  argTypes: {
    bgColor: {
      options: [
        'bg-orange',
        'bg-forest',
        'bg-yellow',
        'bg-green',
        'bg-peach',
        'bg-ltblue',
      ],
      defaultValue: 'bg-orange',
      control: { type: 'select' },
    },
    // logo: {
    //   options: [
    //     '/images/logo-nft-storage-inline-dark.svg',
    //     '/images/logo-nft-storage-inline.svg',
    //   ],
    //   default: '/images/logo-nft-storage-inline.svg',
    //   control: { type: 'select' },
    // },
    dark: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    user: {
      control: { type: 'boolean' },
    },
  },
}

const Template = (
  /** @type {{
   * bgColor: string;
   * user: boolean;
   * dark: boolean;
   * }} */
  args
) => {
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

  function handleClearUser() {
    console.info('clear user fake')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{ user: args.user ? userMock : null, handleClearUser }}
      >
        <Navbar
          logo={{ src: '', isDark: args.dark }}
          bgColor={args.bgColor}
          user={args.user ? userMock : null}
        />
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export const Default = Template.bind({})
