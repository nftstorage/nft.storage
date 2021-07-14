import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
import { createRequire } from 'module'
import SentryWebpackPlugin from '@sentry/webpack-plugin'
import { GitRevisionPlugin } from 'git-revision-webpack-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const gitRevisionPlugin = new GitRevisionPlugin()
dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
})

/**@type {import('webpack').Configuration} */
const config = {
  target: 'webworker',
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    alias: {
      'node-fetch': path.resolve(__dirname, 'fetch.js'),
      stream: require.resolve('readable-stream'),
    },
  },
  stats: 'minimal',
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    }),
    process.env.SENTRY_UPLOAD === 'true' &&
      new SentryWebpackPlugin({
        release: gitRevisionPlugin.version(),
        include: './dist',
        urlPrefix: '/',
        org: 'protocol-labs-it',
        project: 'api',
        authToken: process.env.SENTRY_TOKEN,
      }),
  ].filter(Boolean),
}

export default config
