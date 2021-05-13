const path = require('path')

const nodeBuiltinsPlugin = {
  name: 'node builtins',
  setup(build) {
    build.onResolve({ filter: /^stream$/ }, () => {
      return { path: require.resolve('readable-stream') }
    })
  },
}

module.exports = {
  buildConfig: {
    inject: [path.join(__dirname, './test/scripts/node-globals.js')],
    plugins: [nodeBuiltinsPlugin],
  },
  buildSWConfig: {
    inject: [
      path.join(__dirname, './test/scripts/node-globals.js'),
      path.join(__dirname, './test/scripts/worker-globals.js'),
    ],
    plugins: [nodeBuiltinsPlugin],
  },
}
