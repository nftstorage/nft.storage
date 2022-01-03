import * as sst from '@serverless-stack/resources'

import { EventBus } from '@serverless-stack/resources'

export default class NiftySaveStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    //configure the event bus
    const bus = new EventBus(this, 'Bus', {})

    //Ingest

    //Analyze

    //Pin

    //Verify
  }
}
