const path = require('path')

module.exports = ({ config }) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../'),
    path.resolve(__dirname, '../src'),
  ]
  return config
}
