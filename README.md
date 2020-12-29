# scheduled-lambda

Simple CDK construct to create a lambda function which is invoked from a cloudwatch schedule.

Use cases could include:
- Performing some scheduled scaling operation.
- Performing some scheduled backup or log rotation.
- Periodically checking if a resource or webpage has changed or updated.
- Sending periodic alerts about stock prices or similar.

## Installation

```shell script
npm i @simple-cdk-constructs/scheduled-lambda
```

## Usage

```typescript
import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as logs from '@aws-cdk/aws-logs';
import * as sl from '@simple-cdk-constructs/scheduled-lambda';

export class ExampleStack extends core.Stack {
  constructor(scope: core.Construct, id: string, props?: core.StackProps) {
    super(scope, id, props);

    new sl.ScheduledLambda(this, 'example-scheduled-lambda', {
      name: 'example-scheduled-lambda',
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
  }
}
```