import * as sst from '@serverless-stack/resources'

export default class ControlPanelStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)
    const { api } = props
    const site = new sst.NextjsSite(this, 'NextSite', {
      path: 'frontend',
      environment: {
        NIFTYSAVE_API_ENDPOINT: api.url,
      },
    })

    site.attachPermissions([api])

    this.addOutputs({
      SiteUrl: site.url,
    })
  }
}
