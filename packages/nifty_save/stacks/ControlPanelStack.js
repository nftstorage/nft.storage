import * as sst from '@serverless-stack/resources'

export default class ControlPanelStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)
    const { api } = props
    const site = new sst.NextjsSite(this, 'NextSite', {
      path: 'frontend',
      environment: {
        NIFTYSAVE_API_URL: api.url || 'yoyoyoyo',
      },
    })
    site.attachPermissions([api])
    this.addOutputs({
      ControlPanelURL: site.url,
    })
  }
}
