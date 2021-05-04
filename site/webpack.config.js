const path = require('path')
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.local'),
})
const webpack = require('webpack')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

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
    new SentryWebpackPlugin({
      release: gitRevisionPlugin.version(),
      include: './dist',
      urlPrefix: '/',
      org: 'protocol-labs-it',
      project: 'api',
      authToken: process.env.SENTRY_TOKEN,
    }),
  ],
}
