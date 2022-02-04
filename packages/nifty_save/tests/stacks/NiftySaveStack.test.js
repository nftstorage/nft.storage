import * as sst from '@serverless-stack/resources'

import NiftySaveStack from '../../stacks/NiftySaveStack'
import { Template } from 'aws-cdk-lib/assertions'

//CFN resource types
//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html

test('Test Niftysave Stack - Global', () => {
  const app = new sst.App()
  const stack = new NiftySaveStack(app, 'niftysave-stack')
  const template = Template.fromStack(stack)

  template.hasResource('AWS::Lambda::Function', {})
  template.hasResource('AWS::ApiGatewayV2::Api', {})
  template.hasResource('AWS::Events::EventBus', {})
})

test('NiftySave Stack - Injest', () => {
  const app = new sst.App()
  const stack = new NiftySaveStack(app, 'niftysave-stack')
  const template = Template.fromStack(stack)

  template.hasResource('AWS::Lambda::Function', {})
  template.resourceCountIs('AWS::SQS::Queue', 4)
  template.hasResource('AWS::Events::EventBus', {})
})
