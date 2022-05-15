import React from 'react'
import NavBar from './navbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContext } from 'lib/user'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
})

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
        <NavBar
          logo={{ src: args.logo, isDark: true }}
          bgColor={args.bgColor}
          user={args.user ? userMock : null}
        />
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export const Default = Template.bind({})
