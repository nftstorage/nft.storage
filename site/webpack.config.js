const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
module.exports = {
  target: 'webworker',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      'node-fetch': path.resolve(__dirname, 'fetch.js'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    }),
  ],
}
