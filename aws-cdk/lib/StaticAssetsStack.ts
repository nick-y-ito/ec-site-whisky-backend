import { aws_s3, aws_s3_deployment, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from 'path';

const APP_NAME = process.env['APP_NAME'] || '';
const STAGE = process.env['STAGE'] || 'dev';

export class StaticAssetsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /* Define the S3 bucket */
    const bucket = new aws_s3.Bucket(this, `${APP_NAME}-StaticAssetsBucket-${STAGE}`, {
      /* Enable public access to the bucket */
      publicReadAccess: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },

      /* blockPublicAccess property has to be enabled for the bucket to be public */
      // accessControl: aws_s3.BucketAccessControl.PUBLIC_READ,
      // objectOwnership: aws_s3.ObjectOwnership.OBJECT_WRITER,

      /* This policy defines what happens to the bucket when the stack is deleted.
         For production, you might want to use `cdk.RemovalPolicy.RETAIN` */
      removalPolicy: STAGE === 'dev' ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,

      /* Enable this ONLY for test environments.
         It will delete objects in the bucket before deleting the bucket itself upon stack deletion. */
      autoDeleteObjects: STAGE === 'dev' ? true : false,
    });

    /* Deploy image files to the S3 bucket */
    new aws_s3_deployment.BucketDeployment(this, `${APP_NAME}-S3DeployImages-${STAGE}`, {
      sources: [aws_s3_deployment.Source.asset(path.join(__dirname, '../../express-server/public/'))],
      destinationBucket: bucket,
    });
  }
}
