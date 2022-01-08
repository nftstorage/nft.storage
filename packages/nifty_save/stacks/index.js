import NiftySaveStack from './NiftySaveStack'
export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps(stack => ({
    runtime: 'nodejs14.x',
    environment: {},
  }))

  const stack = new NiftySaveStack(app, 'niftysave-stack')
  console.log(stack.scope)
  stack.addDefaultFunctionEnv({
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_TRACES_SAMPLE_RATE: '1.0',
    NODE_OPTIONS: '-r @sentry/serverless/dist/awslambda-auto',
  })
}
