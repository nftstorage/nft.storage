import React from 'react'
import NavBar from './navbar'
import { useUser } from 'lib/user.js'

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
   * }} */
  args
) => {
  const { user } = useUser()
  return (
    <NavBar
      logo={{ src: args.logo, isDark: true }}
      bgColor={args.bgColor}
      user={user}
    />
  )
}

export const Default = Template.bind({})
