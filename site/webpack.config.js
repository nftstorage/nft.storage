const path = require('path')
module.exports = {
  target: 'webworker',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      'node-fetch': path.resolve(__dirname, 'fetch.js'),
    },
  },
}
