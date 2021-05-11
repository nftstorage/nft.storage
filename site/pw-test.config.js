const path = require('path')

module.exports = {
  buildConfig: {
    inject: [
      path.join(__dirname, './test/scripts/node-globals.js'),
      path.join(__dirname, './test/scripts/worker-globals.js'),
    ],
    plugins: [
      {
        name: 'node builtins',
        setup(build) {
          build.onResolve({ filter: /^stream$/ }, () => {
            return { path: require.resolve('readable-stream') }
          })
        },
      },
    ],
  },
}
