import { expect as expectCDK, countResources } from '@aws-cdk/assert';
import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as logs from '@aws-cdk/aws-logs';

import * as ScheduledLambda from '../lib/index';

const testApp = new core.App();
const testStack = new core.Stack(testApp, 'TestStack');

const testConstruct = new ScheduledLambda.ScheduledLambda(testStack, 'MyTestConstruct', {
  name: 'my-test-scheduled-lambda',
  schedule: events.Schedule.expression('cron(0 7 * * ? *)'),
  functionProps: {
    runtime: lambda.Runtime.NODEJS_12_X,
    code: lambda.Code.fromInline('console.log("this code doesnt work!");'),
    handler: 'index.handler',
    environment: {},
    timeout: core.Duration.seconds(60),
    memorySize: 512,
    functionName: 'my-test-scheduled-lambda',
    logRetention: logs.RetentionDays.ONE_WEEK
  }
});

test('Lambda and log rotation functions are created', () => {
  expectCDK(testStack).to(countResources('AWS::Lambda::Function',2));
  expectCDK(testStack).to(countResources('Custom::LogRetention',1));
});

test('Scheduled event rule is created', () => {
  expectCDK(testStack).to(countResources('AWS::Events::Rule',1));
});
