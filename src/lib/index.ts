import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import {Construct} from "@aws-cdk/core";

export interface ScheduledLambdaProps {
  name: string;
  functionProps: lambda.FunctionProps;
  schedule: events.Schedule;
}

export class ScheduledLambda extends core.Construct {

  constructor(scope: Construct, id: string, props: ScheduledLambdaProps) {
    super(scope, id);

    const handler = new lambda.Function(this, 'scheduled-function', props.functionProps);

    const lambdaTarget = new targets.LambdaFunction(handler);

    const scheduleRule = new events.Rule(this, 'scheduled-rule', {
      schedule: props.schedule,
      targets: [lambdaTarget],
      ruleName: props.name + '-schedule'
    });
  }

}
