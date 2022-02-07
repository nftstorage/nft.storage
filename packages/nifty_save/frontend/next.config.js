const withTM = require('next-transpile-modules')(['reaflow'])

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose', // second add this experimental flag to the config
  },
})
