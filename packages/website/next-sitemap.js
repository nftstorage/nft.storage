// overrides and explicit exclusion of routes to sitemap and robots file
const routes = [
  { loc: '/', priority: 1 },
  { loc: '/docs', priority: 0.8 },
  { loc: '/api-docs', priority: 0.8 },
  { loc: '/faq', priority: 0.8 },
  { loc: '/login', priority: 0.8 },
  { loc: '/terms', priority: 0.8 },
  { loc: '/callback', exclude: true },
  { loc: '/callback-v0', exclude: true },
  { loc: '/files', exclude: true },
  { loc: '/manage', exclude: true },
  { loc: '/new-file', exclude: true },
  { loc: '/new-key', exclude: true },
]

const hiddenRoutes = routes
  .filter(({ exclude }) => exclude)
  .map(({ loc }) => loc)

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nft.storage',
  generateRobotsTxt: true,
  priority: 0.7, // default priority
  transform: async (config, path) => {
    const route = routes.find(({ loc }) => loc === path)

    if (route?.exclude) {
      return null
    }

    return {
      loc: path,
      changefreq: route?.changefreq || config.changefreq,
      priority: route?.priority || config.priority,
      lastmod:
        route?.autoLastmod || config.autoLastmod
          ? new Date().toISOString()
          : undefined,
      alternateRefs: route?.alternateRefs ? config.alternateRefs : [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: hiddenRoutes,
      },
    ],
  },
}
