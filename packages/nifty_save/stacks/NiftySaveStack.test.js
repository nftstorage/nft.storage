import * as sst from '@serverless-stack/resources'

import {
  countResources,
  expect,
  haveResource,
  haveResourceLike,
} from '@aws-cdk/assert'

import NiftySaveStack from './NiftySaveStack'

//CFN resource types
//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html

test('Test Niftysave Stack - Global', () => {
  const app = new sst.App()
  // WHEN
  const stack = new NiftySaveStack(app, 'niftysave-stack')

  // THEN

  expect(stack).to(haveResource('AWS::Lambda::Function'))

  expect(stack).to(haveResource('AWS::ApiGatewayV2::Api'))

  expect(stack).to(haveResource('AWS::Events::EventBus'))
})

test('NiftySave Stack - Injest', () => {
  const app = new sst.App()
  // WHEN
  const stack = new NiftySaveStack(app, 'niftysave-stack')
  expect(stack).to(haveResource('AWS::Lambda::Function'))
  expect(stack).to(countResources('AWS::SQS::Queue', 4))
  expect(stack).to(haveResource('AWS::Events::EventBus'))
})
