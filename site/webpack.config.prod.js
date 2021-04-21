const path = require('path')
module.exports = {
  target: 'webworker',
  mode: 'production',
  resolve: {
    alias: {
      'node-fetch': path.resolve(__dirname, 'fetch.js'),
    },
  },
}
