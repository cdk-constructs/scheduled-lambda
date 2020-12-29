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

  public lambdaFunction: lambda.Function;
  public lambdaTarget: targets.LambdaFunction;
  public scheduleRule: events.Rule;

  constructor(scope: Construct, id: string, props: ScheduledLambdaProps) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, 'scheduled-function', props.functionProps);

    this.lambdaTarget = new targets.LambdaFunction(this.lambdaFunction);

    this.scheduleRule = new events.Rule(this, 'scheduled-rule', {
      schedule: props.schedule,
      targets: [this.lambdaTarget],
      ruleName: props.name + '-schedule'
    });
  }

}
