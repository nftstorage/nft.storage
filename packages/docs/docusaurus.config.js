// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NFT.Storage documentation',
  tagline: 'Free decentralized storage for NFTs',
  url: 'https://nft.storage/',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nftstorage',
  projectName: 'nft.storage',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'content',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsed: false,
          editUrl: 'https://github.com/nftstorage/nft.storage/edit/main/packages/docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'NFT.Storage',
        logo: {
          alt: 'NFT.Storage Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/nftstorage/nft.storage',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quickstart',
                to: '/why-nft-storage#quickstart',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/nft.storage',
              },
              {
                label: 'Slack',
                href: 'https://filecoinproject.slack.com',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/nft_storage',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://nft.storage/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/nftstorage/nft.storage',
              },
            ],
          },
        ],
        copyright: `Made with 💛 by Protocol Labs.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
