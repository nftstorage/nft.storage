import * as sst from '@serverless-stack/resources'

export default class ControlPanelStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    console.log(props)

    // Define our React app
    const site = new sst.NextjsSite(this, 'NextSite', {
      path: 'frontend',
      // Pass in our environment variables
      environment: {
        NIFTYSAVE_API_ENDPOINT: scope.niftysaveApiUrl,
      },
    })

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.url,
    })
  }
}
