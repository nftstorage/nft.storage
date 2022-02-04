import * as sst from '@serverless-stack/resources'

import NiftySaveStack from './NiftySaveStack'
import { Template } from 'aws-cdk-lib/assertions'

console.log(Template)

const template = Template.fromStack(NiftySaveStack)

console.log(template)

const { countResources, expect, haveResource } = template

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
