import NiftySaveStack from './NiftySaveStack'
export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: 'nodejs14.x',
  })

  new NiftySaveStack(app, 'niftysave-stack')
}
