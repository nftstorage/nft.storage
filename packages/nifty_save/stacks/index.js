import ControlPanelStack from './ControlPanelStack'
import NiftySaveStack from './NiftySaveStack'
export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps((stack) => ({
    runtime: 'nodejs14.x',
    environment: {
      HASURA_URL: process.env.HASURA_URL,
      SUBGRAPH_URL: process.env.SUBGRAPH_URL,
      NFTSTORAGE_KEY: process.env.NFTSTORAGE_KEY,
    },
  }))

  const niftysave = new NiftySaveStack(app, 'niftysave-stack')

  const controlpanel = new ControlPanelStack(app, 'controlpanel-stack', {
    api: niftysave.api,
  })
}
