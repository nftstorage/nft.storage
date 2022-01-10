import NiftySaveStack from './NiftySaveStack'
export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps(stack => ({
    runtime: 'nodejs14.x',
    environment: {},
  }))

  const stack = new NiftySaveStack(app, 'niftysave-stack')
}
