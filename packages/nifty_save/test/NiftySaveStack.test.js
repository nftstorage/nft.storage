import * as sst from '@serverless-stack/resources'

import { expect, haveResource } from '@aws-cdk/assert'

import NiftySaveStack from '../stacks/NiftySaveStack'

test('Test Niftysave Stack', () => {
  const app = new sst.App()
  // WHEN
  const stack = new NiftySaveStack(app, 'nifty-save-stack')
  // THEN
  expect(stack).to(haveResource('AWS::Lambda::Function'))
})
