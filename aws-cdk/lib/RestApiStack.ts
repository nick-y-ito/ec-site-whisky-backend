import { aws_apigateway, aws_lambda, aws_lambda_nodejs, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from 'path';

const APP_NAME = process.env['APP_NAME'] || '';
const STAGE = process.env['STAGE'] || 'dev';

export class RestApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const restApiLambdaName = `${APP_NAME}-LambdaRestApi-${STAGE}`;
    const restApiLambdaFunction = new aws_lambda_nodejs.NodejsFunction(this, restApiLambdaName, {
      functionName: restApiLambdaName,
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      handler: 'handler', // The export name of the handler
      entry: path.join(__dirname, '../../express-server/src/lambda.ts'),
      projectRoot: path.join(__dirname, '../../express-server'),
      depsLockFilePath: path.join(__dirname, '../../express-server/package-lock.json'),
      timeout: Duration.seconds(10),
    });

    // Define the API Gateway that triggers the Lambda function
    const restApiGatewayName = `${APP_NAME}-RestApiGateway-${STAGE}`;
    new aws_apigateway.LambdaRestApi(this, restApiGatewayName, {
      handler: restApiLambdaFunction,
    });
  }
}
