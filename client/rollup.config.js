// @ts-ignore
import multiInput from 'rollup-plugin-multi-input'

const config = [
  ['src', 'dist/src'],
  ['test', 'dist/test'],
].map(([base, dest]) => ({
  input: [`${base}/**/*.js`],
  output: {
    dir: dest,
    preserveModules: true,
    sourcemap: true,
    format: 'cjs',
    entryFileNames: '[name].cjs',
  },
  plugins: [multiInput({ relative: base })],
}))
export default config
